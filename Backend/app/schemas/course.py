from pydantic import BaseModel

class CourseBase(BaseModel):
    title: str
    instructor: str
    category: str
    level: str
    duration: str
    price: float
    description: str

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: int
    students: int
    rating: float

    class Config:
        from_attributes = True