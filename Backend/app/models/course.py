from sqlalchemy import Column, Integer, String, Float, Text
from app.database import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    instructor = Column(String)
    category = Column(String)
    level = Column(String)
    duration = Column(String)
    students = Column(Integer, default=0, nullable=False)
    rating = Column(Float, default=0.0, nullable=False)
    price = Column(Float)
    description = Column(Text)

    def __init__(self, **kwargs):
        self.students = kwargs.get("students", 0)
        self.rating = kwargs.get("rating", 0.0)
        for key, value in kwargs.items():
            setattr(self, key, value)
