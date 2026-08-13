from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, Integer

from config.db import Base


class ExpenseLog(Base):
    __tablename__ = "expense_log"

    id = Column(Integer, primary_key=True, autoincrement=True)
    createdDate = Column(DateTime, default=datetime.utcnow)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    type = Column(String(50), nullable=False)  # e.g., 'LOGIN', 'LOGOUT', 'EXPENSE_ADD'
    user_id = Column(String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "createdDate": self.createdDate.isoformat() if self.createdDate else None,
            "title": self.title,
            "description": self.description,
            "type": self.type,
            "user_id": self.user_id,
        }