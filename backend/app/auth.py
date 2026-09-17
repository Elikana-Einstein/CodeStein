import hashlib
import secrets
from datetime import datetime, timedelta, timezone

import bcrypt
from jose import jwt

import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")
if not JWT_SECRET:
    raise RuntimeError("JWT_SECRET is not configured")


JWT_ALGORITHM = "HS256"


def _prepare_secret(secret: str) -> bytes:
    return hashlib.sha256(secret.encode("utf-8")).digest()


def _hash_secret(secret: str) -> str:
    return bcrypt.hashpw(_prepare_secret(secret), bcrypt.gensalt()).decode("utf-8")


def _verify_secret(secret: str, secret_hash: str) -> bool:
    hashed_secret = secret_hash.encode("utf-8")
    if bcrypt.checkpw(_prepare_secret(secret), hashed_secret):
        return True

    # Support hashes created before secrets were pre-hashed.
    legacy_secret = secret.encode("utf-8")[:72]
    return bcrypt.checkpw(legacy_secret, hashed_secret)


def hash_password(password: str):
    return _hash_secret(password)


def verify_password(password: str, password_hash: str):
    return _verify_secret(password, password_hash)


def hash_otp(otp: str):
    return _hash_secret(otp)


def verify_otp(otp: str, otp_hash: str):
    return _verify_secret(otp, otp_hash)


def generate_otp():
    return str(secrets.randbelow(1000000)).zfill(6)


def create_access_token(user_id: int):
    expire = datetime.now(timezone.utc) + timedelta(minutes=60)

    payload = {
        "sub": str(user_id),
        "exp": expire,
    }

    return jwt.encode(
        payload,
        JWT_SECRET,
        algorithm=JWT_ALGORITHM
    )