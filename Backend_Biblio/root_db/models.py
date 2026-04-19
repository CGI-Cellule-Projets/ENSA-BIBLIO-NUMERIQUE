from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Enum
from root_db.database import Base, engine
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
import enum
from sqlalchemy.dialects.mysql import MEDIUMTEXT


class User(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key = True, autoincrement=True)
    firstname = Column(String(20), nullable=False)
    lastname = Column(String(30), nullable=False)
    username = Column(String(50), unique = True, nullable = False)
    email = Column(String(50), unique=True, nullable=False)
    hashed_password = Column(String(100), nullable = False)
    admin = Column(Boolean, default=False, nullable=False)

class Filiere(Base):
    __tablename__ = "Filiere"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    duration = Column(Integer, nullable=False)

class Semester(Base):
    __tablename__ = "Semester"
    id = Column(Integer, primary_key=True, autoincrement=True)
    number = Column(Integer, nullable=False, unique=False)
    filiere_id = Column(Integer, ForeignKey("Filiere.id"))

class Module(Base):
    __tablename__ = "Module"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    semester_id = Column(Integer, ForeignKey("Semester.id"))

class Genre(str, enum.Enum):
    cours = "Cours"
    td = "Td"
    exam = "Exam"
    ouvrage = "Ouvrage"

class PDF(Base):
    __tablename__ = "PDF"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    path = Column(String(60), nullable=False)
    genre = Column(Enum(Genre), nullable=False)
    module_id = Column(Integer, ForeignKey("Module.id"))
    thumbnail = Column(MEDIUMTEXT, nullable=True)

class Ouvrage(Base):
    __tablename__ = "Ouvrage"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    path = Column(String(60), nullable=False)
    genre = Column(Enum(Genre), nullable=False)
    thumbnail = Column(MEDIUMTEXT, nullable=True)

class CreateFiliere(BaseModel):
    name: str
    duration: int

class CreateModule(BaseModel):
    name: str
    semester_id: str

class CreatePDF(BaseModel):
    name: str
    path: str
    genre: Genre
    module_id: int
    thumbnail: str | None = None

class CreateOuvrage(BaseModel):
    name: str
    path: str
    genre: Genre
    thumbnail: str | None = None

class CreateSemester(BaseModel):
    number: int
    filiere_id: int


class CreateUser(BaseModel):
    firstname: str = Field(min_length=1, max_length=20)
    lastname: str = Field(min_length=1, max_length=30)
    username: str = Field(min_length=3, max_length=50)
    hashed_password: str = Field(min_length=5, max_length=100)
    email: EmailStr
    admin: bool 

class UpdateUser(BaseModel):
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    email: Optional[EmailStr] = None

class UpdateRole(BaseModel):
    admin: bool




Base.metadata.create_all(engine) 