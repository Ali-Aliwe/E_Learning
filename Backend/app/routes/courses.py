from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.course import Course, CourseCreate
from app.models.course import Course as CourseModel

router = APIRouter(prefix="/api/courses", tags=["courses"])

@router.get("/", response_model=List[Course])
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(CourseModel).all()
    return courses

@router.get("/{course_id}", response_model=Course)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.post("/", response_model=Course)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    new_course = CourseModel(**course.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course