from fastapi import Depends, FastAPI, HTTPException, status ,File, UploadFile
import pyqrcode
import secrets
from pyzbar.pyzbar import decode
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from . import CRUD, models, schemas
from datetime import datetime, timedelta
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#users
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = CRUD.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=status.HTTP_226_IM_USED, detail="Email already registered")
    return CRUD.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = CRUD.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = CRUD.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


#reservation

@app.get("/reservation/", response_model=list[schemas.reservation])
def read_reservation(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return CRUD.get_reservations(db, skip=skip, limit=limit)


@app.get("/qrcode")
async def get_QRcode(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):
    return CRUD.getReservationCode(current_user.id, db)


@app.post("/makeReservation/")
async def make_reservation(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):
    if current_user.is_worker == 0:
        id = current_user.id
        return CRUD.create_reservation(id, db)
    else:
        return "Reservation Failed!"


@app.delete("/reservation/")
async def delete_reservation(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):
    if current_user.is_worker == 0:
        id = current_user.id
        return CRUD.delete_reservation(id, db)


@app.get("/reservation/check/")
async def check_reservation(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):
    return CRUD.chek_reservation(current_user.id, db)
# login


@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = CRUD.authenticate_user(
        db, form_data.client_id, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = CRUD.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me/", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(CRUD.get_current_active_user)):
    return current_user
# reservation_worker


@app.post("/reservation/{code}")
def verify_reservation(code: str, current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):
    if current_user.is_worker == 1:
        return CRUD.verify_reservation(code, db)


@app.post("/reservation/")
def cancel_reservation_by_worker(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):
    if current_user.is_worker == 1:
        return CRUD.cancel_reservation_by_worker(db)


# restaurant

@app.post("/restorantState/")
async def add_state(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db), principal: str = "", desert: str = "", salad: str = "", meat: str = "", supliment: str = ""):
    if current_user.is_worker == 1:
        return CRUD.add_state(db, principal, desert, salad, meat, supliment)


@app.put("/restorantState/state")
async def change_state(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):
    if current_user.is_worker == 1:
        return CRUD.change_state(db)


@app.get("/restorantState/state")
async def check_state(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):
    return CRUD.check_state(db)


@app.get("/restorantState/activity")
async def check_activity(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):
    return CRUD.check_activity(db)


@app.put("/restorantState/queue")
async def change_queue_state(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):
    if current_user.is_worker == 1:
        return CRUD.change_queue_state(db)


@app.get("/restorantState/queue")
async def check_queue(db: Session = Depends(get_db)):
    return CRUD.check_queue(db)


@app.get("/restorantState/meal")
async def check_meal(db: Session = Depends(get_db)):
    return CRUD.check_meal(db)


@app.get("/restorantState/queue/me")
async def check_queue_position(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):

    if current_user.is_worker == 0:

        id = current_user.id

        return CRUD.check_queue_position(id, db)
    else:
        return "You are not a student!"


# purchase
@app.post("/purchase/", response_model=schemas.purchase)
async def make_purchase(purchase: schemas.purchaseCreate, current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):

    if current_user.is_worker == 0:

        return CRUD.make_purchase(purchase, current_user, db)

    else:

        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Workers can not make purchases!")
# Generate a random secret token for the QR code
@app.get("/getTickets/")
async def check_queue_position(current_user: models.User = Depends(CRUD.get_current_active_user), db: Session = Depends(get_db)):
    return current_user.nb_tickets