
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, DateTime,JSON
from sqlalchemy.orm import relationship
from .database import Base
from datetime import date, datetime
from sqlalchemy.sql import func



class User(Base):
    __tablename__  = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(200), unique=True, index=True)
    hashed_password = Column(String(10000))
    name = Column(String(20))
    nb_tickets = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    reservations = relationship("reservation", back_populates="maker")
    purchases = relationship("purchase", back_populates="buyer")
    is_worker = Column(Boolean)


class purchase(Base):
    __tablename__  = "purchase"
    id = Column(Integer, primary_key=True, index=True)
    time = Column(DateTime, default=func.now(), index=True)
    nb_tickets = Column(Integer, default=0)
    buyer_id = Column(Integer, ForeignKey("users.id"))
    buyer = relationship("User", back_populates="purchases")

   
class reservation(Base):
    __tablename__  = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    time = Column(DateTime, default=func.now(), index=True)
    maker_id = Column(Integer, ForeignKey("users.id"))
    maker = relationship("User", back_populates="reservations")
    restaurantState_id = Column(Integer, ForeignKey("restaurantState.id"))
    reState= relationship(
        "restaurantState", back_populates="reservationsMade")
    QRcode=Column(String(40), unique=True, index=True)
    

class restaurantState(Base):
    __tablename__  = "restaurantState"
    id = Column(Integer, primary_key=True, index=True)
    time = Column(DateTime, default=func.now(), index=True)
    principal = Column(String(20),default="") 
    desert = Column(String(20),default="")
    salad = Column(String(20),default="")
    meat = Column(String(20),default="")
    supliment = Column(String(20),default="")
    nbServed = Column(Integer, default=0)
    is_open = Column(Boolean, default=0)
    is_active= Column(Boolean, default=1)
    stateOfQueue = Column(Boolean, default=1)
    onHoldQueueJ = Column(JSON,default={})
    passedJ = Column(JSON, default={})
    reservationsMade = relationship("reservation", back_populates="reState")