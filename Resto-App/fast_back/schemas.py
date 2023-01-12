from typing import Union
import json
from pydantic import BaseModel, fields
from datetime import date,datetime
class reservationBase(BaseModel):
    maker_id: int


class reservationCreate(reservationBase):
    pass


class reservation(reservationBase):
    id: int
    restaurantState_id:int
    time: datetime
    state: bool
    class Config:
        orm_mode = True


class purchaseBase(BaseModel):
    
    nb_tickets: int

class purchaseCreate(purchaseBase):
    accountName:str
    accountPassword:str


class purchase(purchaseBase):
    id: int
    buyer_id: int
    time: datetime
    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str
    name: str
    is_worker: bool


class UserCreate(UserBase):
    
    password: str


class User(UserBase):
    id: int
    is_active: bool
    nb_tickets: int

    Reservations: list[reservation] = []
    purchases: list[purchase] = []

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Union[str, None] = None


class restaurantStateBase(BaseModel):
    principal:str
    desert:str
    salad:str
    meat:str
    supliment:str


class restaurantStateCreate(BaseModel):
    pass


class restaurantState(BaseModel):
    time: datetime
    nbServed : int
    is_open : bool
    is_active :bool
    stateOfQueue : bool 
    onHoldQueueJ : str
    passedJ : str
    class Config:
        orm_mode = True