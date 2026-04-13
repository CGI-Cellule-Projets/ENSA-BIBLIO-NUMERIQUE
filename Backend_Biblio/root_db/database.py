from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session
from dotenv import load_dotenv
import os
from fastapi import Depends
from typing import Annotated


load_dotenv()

DB_URL = os.getenv("DB_URL")

engine = create_engine(DB_URL)

class Base(DeclarativeBase):
    pass

SessionLocal = sessionmaker(
    bind = engine,
    autoflush=False,
    autocommit=False
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


DBSession = Annotated[Session, Depends(get_db)]