from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from root_db.models import CreateUser
from root_db.database import DBSession
import root_db.models as models
from API.Auth.auth_methods import hash_password, pwd_context
from API.Auth.jwt import (
    oauth2_scheme,
    create_access_token,
    ALGORITHM,
    SECRET_KEY,
    UPLOADPATH,
)
from datetime import timedelta
from jose import jwt, exceptions
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
import shutil
import os
from pdf2image import convert_from_path
from io import BytesIO
import base64


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""UPLOAD_PATH = os.path.expanduser(UPLOADPATH)"""

app.mount("/pdfs", StaticFiles(directory="pdfs"), name="pdfs")

def generate_pdf_thumbnail(file_path: str, size: tuple = (300, 400)) -> str:
    """Renders the first page of a PDF and returns a base64-encoded PNG thumbnail."""
    images = convert_from_path(file_path, first_page=1, last_page=1, dpi=72)
    if not images:
        return None

    img = images[0]
    img.thumbnail(size)

    buffer = BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)

    return base64.b64encode(buffer.read()).decode("utf-8")


@app.post("/register")
async def register(user: CreateUser, db: DBSession):
    db_user = models.User(**user.model_dump())
    check_user = db.query(models.User).filter(models.User.id == db_user.id).first()
    if check_user is None:
        db_user.hashed_password = hash_password(db_user.hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        raise HTTPException(status_code=status.HTTP_201_CREATED)
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)


@app.post("/login")
async def verify_user(
    db: DBSession, user_logged: OAuth2PasswordRequestForm = Depends()):
    user_db = (
        db.query(models.User)
        .filter(models.User.username == user_logged.username)
        .first()
    )
    if user_db is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    elif not pwd_context.verify(user_logged.password, user_db.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    else:
        return {
            "access_token": create_access_token(
                timedelta(minutes=10),
                {
                    "sub": user_db.username,
                    "name": user_db.firstname,
                    "admin": user_db.admin,
                    "id": user_db.id,
                },
            ),
            "token_type": "Bearer",
        }


@app.get("/islogged")
async def islogged(token=Depends(oauth2_scheme)):
    try:
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    return {"logged" : True} 

@app.get("/username")
async def get_username(token = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)   

    return {"username" : payload["sub"]} 

@app.put("/update_user")
async def update_user(
    db: DBSession, new: models.UpdateUser, token=Depends(oauth2_scheme)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    logged_id = payload["id"]
    db_user = (
        db.query(models.User).filter(models.User.id == logged_id).first()
    )
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    elif db_user.email == new.email and db_user.firstname == new.firstname and db_user.lastname == new.lastname:
        return { "message" : "User Unchanged" }
    updated_user = new.model_dump(exclude_unset=True)

    updated_user = {key: value 
                    for key, value in updated_user.items() 
                    if value != ""
    }

    for key, value in updated_user.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return { "message" : "User Updated" }


@app.post("/post_filiere")
async def createfiliere(new_filiere: models.CreateFiliere, db: DBSession):
    db_filiere = models.Filiere(**new_filiere.model_dump())
    db.add(db_filiere)
    db.flush()

    for numero in range(1, db_filiere.duration+1):
        semester = models.CreateSemester(number=numero, filiere_id=db_filiere.id)
        db_semester = models.Semester(**semester.model_dump())
        db.add(db_semester)
    db.commit()

@app.get("/get_filiere")
async def get_filiere(db: DBSession):
    db_filieres = db.query(models.Filiere).all()
    return db_filieres

@app.get("/filiere/{filiere_id}/semester/{semester_num}")
async def get_modules(filiere_id: int, semester_num: int, db:DBSession):
    modules = db.query(models.Module).join(models.Semester).filter(
        models.Semester.number == semester_num,
        models.Semester.filiere_id == filiere_id
    ).all()

    return modules

@app.get("/filiere/{filiere_id}")
async def get_filiere_(db: DBSession, filiere_id: int):
    filiere = db.query(models.Filiere).filter(models.Filiere.id == filiere_id).first()
    return filiere

@app.post("/add_filiere")
async def add_filiere(db: DBSession, new_filiere: models.CreateFiliere):
    db_filiere = models.Filiere(**new_filiere.model_dump())
    
    db.add(db_filiere)
    db.commit()

@app.post("/add_module/{filiere_id}/{semester_id}/{name}")
async def add_module(db: DBSession, filiere_id: int, semester_id: int, name: str):
    semester = db.query(models.Semester).filter(models.Semester.number == semester_id, models.Semester.filiere_id == filiere_id).first()
    module_to_add = models.Module()
    module_to_add.name = name
    module_to_add.semester_id = semester.id

    db.add(module_to_add)
    db.commit()


@app.post("/upload")
async def upload_file(file: UploadFile = File(...), module_id: int = Form(...)):
    file_path = f"pdfs/{module_id}/{file.filename}"
    os.makedirs(f"pdfs/{module_id}", exist_ok=True)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    thumbnail_b64 = generate_pdf_thumbnail(file_path)

    return {
        "path": file_path,
        "thumbnail": thumbnail_b64 
    }

@app.post("/add_pdf")
async def add_pdf(db: DBSession, new_module: models.CreatePDF):
    data = new_module.model_dump()

    if not data.get("thumbnail") and data.get("path"):
        data["thumbnail"] = generate_pdf_thumbnail(data["path"])

    db_module = models.PDF(**data)
    db.add(db_module)
    db.commit()
    return db_module

@app.get("/filiere/{filiere_id}/semester/{genre}/modules/{module_id}")
async def get_cours(db: DBSession, genre: models.Genre, module_id: int):
    db_cours = db.query(models.PDF).join(models.Module).filter(
        models.PDF.genre == genre,
        models.Module.id == module_id
    ).all()

    return db_cours

@app.get("/get_filiere/{filiere_id}")
async def get_filiere_name(db: DBSession, filiere_id: int):
    return db.query(models.Filiere).filter(models.Filiere.id == filiere_id).first().name


import os, shutil

@app.delete("/delete_filiere/{filiere_id}")
async def delete_filiere(filiere_id: int, db: DBSession):
    filiere = db.query(models.Filiere).filter(models.Filiere.id == filiere_id).first()
    if filiere is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Filiere not found")
    
    semestres = db.query(models.Semester).filter(models.Semester.filiere_id == filiere_id).all()
    for semestre in semestres:
        modules = db.query(models.Module).filter(models.Module.semester_id == semestre.id).all()
        for module in modules:
            pdfs = db.query(models.PDF).filter(models.PDF.module_id == module.id).all()
            for pdf in pdfs:
                if os.path.exists(pdf.path):
                    os.remove(pdf.path)
                db.delete(pdf)
            db.flush()
            folder = f"pdfs/{module.id}"
            if os.path.exists(folder):
                shutil.rmtree(folder)
            db.delete(module)
        db.flush()
        db.delete(semestre)
    db.flush()
    db.delete(filiere)
    db.commit()
    return {"message": "Filiere and all related data deleted"}

@app.get("/admin")
async def is_admin(db: DBSession, token = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user_db = db.query(models.User).filter(models.User.id == payload["id"]).first()
    return {"is_admin" : user_db.admin}

@app.get("/ouvrages")
async def ouvrage(db: DBSession):
    ouvrages = db.query(models.PDF).filter(models.PDF.genre == "Ouvrage").all()
    if ouvrages is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return ouvrages

@app.post("/add_ouvrage")
async def post_ouvrage(db: DBSession, new_pdf: models.CreateOuvrage):
    data = new_pdf.model_dump()

    if not data.get("thumbnail") and data.get("path"):
        data["thumbnail"] = generate_pdf_thumbnail(data["path"])

    db_ouvrage = models.PDF(**data)
    db.add(db_ouvrage)
    db.commit()


@app.get("/get_current")
async def get_current(db: DBSession, token = Depends(oauth2_scheme)):
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return db.query(models.User).filter(models.User.id == payload["id"]).first()


@app.get("/get_users")
async def get_users(db: DBSession):
    return db.query(models.User).all()

@app.delete("/delete_user/{user_id}")
async def delete_user(db: DBSession, user_id: int):
    user_to_delete = db.query(models.User).filter(models.User.id == user_id).first()
    db.delete(user_to_delete)
    db.commit()
    return { "message" : "Deleted" }


@app.put("/update_role/{user_id}")
async def update_role(user_id: int, role: models.UpdateRole, db: DBSession):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.admin = role.admin
    db.commit()
    db.refresh(user)
    return {"message": "Role updated", "admin": user.admin}


@app.delete("/delete_module/{module_id}")
async def delete_module(db: DBSession, module_id: int, token = Depends(oauth2_scheme)):
    try:
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    db_module = db.query(models.Module).filter(models.Module.id == module_id).first()
    if db_module is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module introuvable")
    pdfs = db.query(models.PDF).filter(models.PDF.module_id == module_id).all()
    for pdf in pdfs:
        if os.path.exists(pdf.path):
            os.remove(pdf.path)
    db.delete(db_module)
    db.commit()


@app.delete("/delete_pdf/{pdf_id}")
async def delete_pdf(db: DBSession, pdf_id: int, token = Depends(oauth2_scheme)):
    try:
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    pdf_to_delete = db.query(models.PDF).filter(models.PDF.id == pdf_id).first()
    db.delete(pdf_to_delete)
    db.commit()
    return { "message" : "PDF Deleted" }

