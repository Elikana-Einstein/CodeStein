from fastapi import APIRouter, Request, Depends, HTTPException, status
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse
from .schemas import RegisterRequest, VerifyOTPRequest, ResendOTPRequest, LoginRequest, TokenResponse
from .auth import (
    generate_otp,
    hash_otp,
    create_access_token,
    verify_password,
    hash_password,
    verify_otp as verify_otp_hash,
)
from .database import get_db
from .model import User
from .email_service import send_otp_email
router = APIRouter()

@router.post("/register")
def register(data: RegisterRequest, db=Depends(get_db)):
    username = data.username
    email = data.email
    password = data.password

    existing_user = db.query(User).filter((User.email == email) | (User.username == username)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email or username already exists"
        )

    hashed_password = hash_password(password)
    otp = generate_otp()
    hashed_otp = hash_otp(otp)    
    expires_at = datetime.utcnow() + timedelta(minutes=10)

    user = User(
        username=username,
        email=email,
        password_hash=hashed_password,
        otp_hash=hashed_otp,
        otp_expires_at=expires_at
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    send_otp_email(email, otp)

    return JSONResponse(content={"message": "User registered successfully", "email": email})


@router.post("/verify-otp")
def verify_otp(data: VerifyOTPRequest, db=Depends(get_db)):
    email = data.email
    otp = data.otp

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is already verified"
        )

    if not user.otp_expires_at or not user.otp_hash or datetime.utcnow() > user.otp_expires_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP has expired"
        )

    if not verify_otp_hash(otp, user.otp_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP"
        )

    user.is_verified = True
    user.otp_hash = None
    user.otp_expires_at = None
    db.commit()

    return JSONResponse(content={"message": "User verified successfully"})


@router.post("/resend-otp")
def resend_otp(data: ResendOTPRequest, db=Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is already verified"
        )

    otp = generate_otp()
    user.otp_hash = hash_otp(otp)
    user.otp_expires_at = datetime.utcnow() + timedelta(minutes=10)
    db.commit()
    send_otp_email(user.email, otp)

    return JSONResponse(content={"message": "OTP sent successfully"})

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db=Depends(get_db)):
    username = data.username
    password = data.password

    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not verified"
        )

    if not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect password"
        )

    access_token = create_access_token(user.id)

    return TokenResponse(access_token=access_token, token_type="bearer")