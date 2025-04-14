from sqlalchemy.orm import Session,joinedload
from app.models import organization as model
from app.schemas import organization as schemas

def create_organization(db: Session, organization: schemas.OrganizationCreate):
    db_organization = model.Organization(**organization.model_dump())
    db.add(db_organization)
    db.commit()
    db.refresh(db_organization)
    return db_organization

def get_organizations(db: Session, skip: int = 0, limit: int = 100, name: str = None):
    query = db.query(model.Organization)
    if name:
        query = query.filter(model.Organization.name.ilike(f"%{name}%"))
    return query.offset(skip).limit(limit).all()

def get_organization(db: Session, organization_id: int):
    return db.query(model.Organization).options(joinedload(model.Organization.contacts)).filter(model.Organization.id == organization_id).first()

def update_organization(db: Session, organization_id: int, updated_data: schemas.OrganizationUpdate):
    organization = get_organization(db, organization_id)
    if not organization:
        return None
    for key, value in updated_data.model_dump().items():
        setattr(organization, key, value)
    db.commit()
    db.refresh(organization)
    return organization

def delete_organization(db: Session, organization_id: int):
    organization = get_organization(db, organization_id)
    if organization.contacts and len(organization.contacts) > 0:
        return False
    if organization:
        db.delete(organization)
        db.commit()
    return organization

