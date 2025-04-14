from pydantic import BaseModel
from typing import List
from app.schemas.contact import ContactOut

class OrganizationBase(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    city: str
    province: str
    country: str
    postal_code: str

class OrganizationCreate(OrganizationBase):
    pass

class OrganizationUpdate(OrganizationBase):
    pass

class OrganizationOut(OrganizationBase):
    id: int
    class Config:
        from_attributes = True
class OrganizationOutWithContacts(OrganizationBase):
    id: int
    contacts: List[ContactOut] = []
    class Config:
        from_attributes = True
