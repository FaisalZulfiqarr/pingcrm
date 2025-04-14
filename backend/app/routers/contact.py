from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.schemas import contact 
from app.cruds import contact as crud
from ..db.database import SessionLocal

router = APIRouter(prefix="/contacts", tags=["Contacts"])

def get_db():
    db_conn = SessionLocal()
    try:
        yield db_conn
    finally:
        db_conn.close()

@router.post("/", response_model=contact.ContactOut)
def create(contact: contact.ContactCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_contact(db, contact)
    except SQLAlchemyError as e:
        # Log actual error internally if needed
        raise HTTPException(status_code=400, detail=f"Database Error: {str(e.orig)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected Error: {str(e)}")

@router.get("/", response_model=list[contact.ContactWithOrganization])
def read_contacts(name: str = None, db: Session = Depends(get_db)):
    return crud.get_contacts(db, name=name)

@router.get("/{contact_id}", response_model=contact.ContactOut)
def read_contact(contact_id: int, db: Session = Depends(get_db)):
    contact = crud.get_contact(db, contact_id)
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

@router.put("/{contact_id}", response_model=contact.ContactOut)
def update(contact_id: int, contact: contact.ContactUpdate, db: Session = Depends(get_db)):
    updated = crud.update_contact(db, contact_id, contact)
    if updated is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return updated

@router.delete("/{contact_id}")
def delete(contact_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_contact(db, contact_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"detail": "Deleted"}
