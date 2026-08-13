from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schema.log_schema import ExpenseLogCreate, ExpenseLogResponse
from models.log_model import ExpenseLog
from config.db import get_db
from dependencies.auth import get_current_user

router = APIRouter(prefix="/api/logs", tags=["Logs"])

@router.post("/")
def create_log(log_data: ExpenseLogCreate, db: Session = Depends(get_db)):
    new_log = ExpenseLog(
        title=log_data.title,
        description=log_data.description,
        type=log_data.type,
        user_id=log_data.user_id
    )
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return {"status": "success", "data": new_log.to_dict()}


@router.get("/")
def get_logs(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)) -> dict:
    logs = db.query(ExpenseLog).all()
    return {"status": "success", "data": [log.to_dict() for log in logs]}


