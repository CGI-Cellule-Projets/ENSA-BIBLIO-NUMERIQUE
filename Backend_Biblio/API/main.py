from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
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
import os
import httpx, google.generativeai as genai, json
from bs4 import BeautifulSoup


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""UPLOAD_PATH = os.path.expanduser(UPLOADPATH)

app.mount("/pictures", StaticFiles(directory=UPLOAD_PATH), name="pictures")"""


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
    db: DBSession, user_logged: OAuth2PasswordRequestForm = Depends()
):
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
                timedelta(seconds=30),
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


@app.put("/update_user")
async def update_user(
    db: DBSession, new: models.UpdateUser, token=Depends(oauth2_scheme)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    logged_username = payload["sub"]
    db_user = (
        db.query(models.User).filter(models.User.username == logged_username).first()
    )
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    elif (
        db.query(models.User).filter(models.User.username == new.username).first()
        is not None
    ):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    updated_user = new.model_dump(exclude_unset=True)

    updated_user = {key: value 
                    for key, value in updated_user.items() 
                    if value != ""
    }

    for key, value in updated_user.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)


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

@app.post("/add_module")
async def add_filiere(db: DBSession, new_filiere: models.CreateModule):
    db_module = models.Module(**new_filiere.model_dump())
    db.add(db_module)
    db.commit()
