from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException, status,File, UploadFile
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from typing import Union
from jose import JWTError, jwt
from passlib.context import CryptContext
from . import models, schemas
from .database import SessionLocal
from datetime import date
from datetime import datetime
from sqlalchemy import delete
import pyqrcode
import secrets
from pyzbar.pyzbar import decode
import requests
import json
SECRET_KEY = "d5f0028826a6b8edb79fb90c36104639edc081f4f9d5b9db50b9a385e485b53c"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#User
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id==user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_email_type(db: Session, type : str,email: str):
    
    return db.query(models.User).filter(models.User.email == email, models.User.is_worker == type).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()



pwd_ctx = CryptContext(schemes=["bcrypt"],deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")



def create_user(db: Session, user: schemas.UserCreate):
    hashedPassword = pwd_ctx.hash(user.password)
    db_user = models.User(is_worker=user.is_worker,email=user.email,name=user.name, hashed_password=hashedPassword)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

    
def verify_password(plain_password, hashed_password):
    return pwd_ctx.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_ctx.hash(password)

def authenticate_user(db:Session,type :str, email: str, password: str):
    user = get_user_by_email_type(db,type, email)
    if not user:
        
        return False
    if not verify_password(password, user.hashed_password):
       
        return False
   
    return user


#Restorant_state

def add_state( db : Session,principal : str ="",desert : str ="",salad : str ="",meat : str ="",supliment : str ="" ):
    
    onHoldQueue =[]
    
    passed=[]
    db_restaurantState = models.restaurantState(principal =principal,desert =desert,salad =salad,meat =meat,supliment = supliment,onHoldQueueJ=json.dumps(onHoldQueue),passedJ = json.dumps(passed))
    db.add(db_restaurantState)
    db.commit()
    db.refresh(db_restaurantState)
    return db_restaurantState
def check_state(db:Session):
    return (db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()).is_open
def change_state(db:Session):
    (db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()).is_open=not (db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()).is_open 
    db.commit()
    return (db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()).is_open
def check_queue(db:Session):
    return (db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()).stateOfQueue
def change_queue_state(db:Session):
    (db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()).stateOfQueue=not (db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()).stateOfQueue 
    db.commit()
    return (db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()).stateOfQueue

def check_queue_position(user_id:int,db:Session):
    
    rest =db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()
    
    onHoldQueue = json.loads(rest.onHoldQueueJ)
    
    return onHoldQueue.index(user_id)

def check_meal(db:Session):
    reState=db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()
    D={"principal" : reState.principal , 
    "desert" : reState.desert ,
    "salad" : reState.salad ,
    "meat" : reState.meat,
    "supliment ": reState.supliment}
    return D

#Reservation
def get_reservations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.reservation).offset(skip).limit(limit).all()

def get_reservation_by_id(id:int, db: Session):
    resId=(db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()).id
    return db.query(models.reservation).filter(models.reservation.maker_id == id,models.reservation.restaurantState_id==resId).first()

def delete_reservation_by_id(id:int, db: Session):
    reservationToDelete=get_reservation_by_id(id, db)
    db.delete(reservationToDelete)
    db.commit()
    return "Reservation deleted!"

def create_reservation(user_id: int,db: Session):
    rest =db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()
    onHoldQueue = json.loads(rest.onHoldQueueJ)
    
    passed = json.loads(rest.passedJ)
    user = get_user(db, user_id)
    if rest.is_open :
        if user.nb_tickets>0:
            if (user_id in onHoldQueue):
                return "You already have a reservation!" 
            elif (user_id in passed):
                return "You already had your meal!"
            else :
                onHoldQueue.append(user_id)
                rest.onHoldQueueJ=json.dumps(onHoldQueue)
                db.commit()
                secret_token = secrets.token_hex(16)
                #
                db_reservation = models.reservation( maker_id=user_id,restaurantState_id=rest.id,QRcode=secret_token)
                db.add(db_reservation)
                db.commit()
                db.refresh(db_reservation)
                return db_reservation
        else:
            return "You are out of tickets!"
    else:
        return "Restaurant is not open yet"
    
def delete_reservation(id :int ,db: Session):
    delete_reservation_by_id(id,db)
    
    rest =db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()
    onHoldQueue = json.loads(rest.onHoldQueueJ)
    
    onHoldQueue.remove(id)
    rest.onHoldQueueJ=json.dumps(onHoldQueue)
    
    db.commit()
    return "Delete done"

#QRcode

def getReservationCode(id :int, db : Session):
    resv=get_reservation_by_id(id,db)
    return resv.QRcode
    

def verify_reservation(qr_code: str,db:Session):
    # Verify that the QR code data matches the secret token
    rest =db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()
    onHoldQueue = json.loads(rest.onHoldQueueJ)
    passed = json.loads(rest.passedJ)
    if qr_code == getReservationCode(onHoldQueue[0],db):
        passed.append(onHoldQueue[0])
        user=get_user(db,onHoldQueue[0])
        user.nb_tickets-=1
        onHoldQueue.pop(0)
        rest.onHoldQueueJ=json.dumps(onHoldQueue)
        rest.passedJ=json.dumps(passed)
        (db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()).nbServed+=1
        db.commit()

        return "Reservation Passed!"
    else:
        return "Wrong QR code!"
        
def cancel_reservation_by_worker(db:Session):
    rest =db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()
    onHoldQueue = json.loads(rest.onHoldQueueJ)
    delete_reservation(onHoldQueue[0],db)
    
    return "Reservation Deleted!"

#JWT
def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(db :Session=Depends(get_db),token: str = Depends(oauth2_scheme)):
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    
    return user

async def get_current_active_user(current_user: models.User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def chek_reservation(id :int , db:Session):
    rest =db.query(models.restaurantState).order_by(models.restaurantState.id.desc()).first()
    if rest.is_open:
        reservation = get_reservation_by_id(id,db)
        if reservation:
            return True
        else:
            return False
    else:
        return False    
    

#Purchase
def get_purchases(db: Session , skip: int = 0, limit: int = 100):
    return db.query(models.purchase).offset(skip).limit(limit).all()


def make_purchase( purchase: schemas.purchaseCreate,user: models.User,db :Session):
    url = "http://127.0.0.1:3000/payments/"
    data = {"accountName": purchase.accountName,"accountPassword": purchase.accountPassword}
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=data, headers=headers)
    if(response.status_code==200):
        
        db_purchase = models.purchase(buyer_id=user.id,nb_tickets=purchase.nb_tickets)
        user=get_user_by_email(db,user.email)
        user.nb_tickets+=purchase.nb_tickets
        db.commit()
        db.add(db_purchase)
        db.commit()
        db.refresh(db_purchase)
        return db_purchase
    else:
        
        return "Unsuccessfull Purchase!"
