from pydantic import BaseModel
from typing import Optional

class ExpenseLogCreate(BaseModel):
    title: str
    description: Optional[str] = None
    type: str
    user_id: Optional[str] = None


class ExpenseLogResponse(BaseModel):
    id: int
    createdDate: str
    title: str
    description: Optional[str] = None
    type: str
    user_id: Optional[str] = None

    class Config:
        from_attributes = True
