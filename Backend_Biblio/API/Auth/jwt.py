from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from datetime import timedelta, datetime, timezone
from dotenv import load_dotenv
import os

load_dotenv()

UPLOADPATH = os.getenv("UPLOADPATH")
ALGORITHM = os.getenv("ALGORITHM")
SECRET_KEY = os.getenv("SECRET_KEY")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_access_token(expire_time: timedelta, data: dict, ):
    to_encode = data.copy()
    expire_time = datetime.now(timezone.utc) + expire_time
    to_encode.update({'exp': expire_time})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



    