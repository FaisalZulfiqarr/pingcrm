from pydantic import BaseModel

class ContactBase(BaseModel):
    name: str
    phone: str
    city: str
    organization_id: int
    address: str
    city: str
    province: str
    country: str
    postal_code: str

class ContactCreate(ContactBase):
    pass

class ContactUpdate(ContactBase):
    pass

class ContactOut(ContactBase):
    id: int

    class Config:
        from_attributes = True

class ContactWithOrganization(BaseModel):
    id: int
    name: str
    phone: str
    city: str
    organization: str
    organization_id: int
    address: str
    city: str
    province: str
    country: str
    postal_code: str

    class Config:
        from_attributes = True