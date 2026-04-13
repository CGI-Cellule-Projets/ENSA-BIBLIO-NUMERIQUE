from passlib.context import CryptContext
from root_db.database import DBSession
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status
import root_db.models as models

pwd_context = CryptContext(schemes=['argon2'], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

    
