from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import organization
from .routers import contact

from .db.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router)
app.include_router(organization.router)

@app.get('/')
def hello():
    return {"message": "This is Faisal's PingCRM"}