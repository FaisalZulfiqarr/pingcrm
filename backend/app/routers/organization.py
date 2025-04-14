from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.schemas import organization
from app.cruds import organization as crud
from ..db.database import SessionLocal

router = APIRouter(prefix="/organizations", tags=["Organizations"])

def get_db():
    db_conn = SessionLocal()
    try:
        yield db_conn
    finally:
        db_conn.close()

@router.get("/", response_model=list[organization.OrganizationOut])
def read_organizations(name: str = None, db: Session = Depends(get_db)):
    return crud.get_organizations(db, name=name)

@router.get("/{organization_id}", response_model=organization.OrganizationOutWithContacts)
def read_organization(organization_id: int, db: Session = Depends(get_db)):
    db_organization = crud.get_organization(db, organization_id)
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return db_organization

@router.post("/", response_model=organization.OrganizationOut)
def create(organization: organization.OrganizationCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_organization(db, organization)
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Database Error: {str(e.orig)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected Error: {str(e)}")


@router.put("/{organization_id}", response_model=organization.OrganizationOut)
def update(organization_id: int, organization: organization.OrganizationUpdate, db: Session = Depends(get_db)):
    updated_organization = crud.update_organization(db, organization_id, organization)
    if updated_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return updated_organization

@router.delete("/{organization_id}")
def delete(organization_id: int, db: Session = Depends(get_db)):
    deleted_organization = crud.delete_organization(db, organization_id)
    if deleted_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    if deleted_organization is False:
        raise HTTPException(status_code=400, detail="Cannot delete organization with existing associated contacts")
    return {"detail": "Deleted"}
