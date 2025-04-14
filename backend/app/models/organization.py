from sqlalchemy import Column, Integer, String
from ..db.database import Base


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String,unique=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    address = Column(String)
    city = Column(String)
    province = Column(String)
    country = Column(String)
    postal_code = Column(String)