from sqlalchemy import Column, Integer, String, ForeignKey
from ..db.database import Base
from sqlalchemy.orm import relationship

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    address = Column(String)
    city = Column(String)
    province = Column(String)
    country = Column(String)
    postal_code = Column(String)
    phone = Column(String)
    company_id = Column(Integer, ForeignKey("organizations.id"))

    company = relationship("Organization", backref="contacts")