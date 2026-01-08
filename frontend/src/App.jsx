import React, { useState, useEffect } from 'react';
import { BookOpen, User, LogIn, LogOut, Search, Filter, Award, Clock, Users, Star, CheckCircle, PlayCircle } from 'lucide-react';

// Mock API - Replace with actual FastAPI backend
const API_BASE = 'http://localhost:8000/api';

const ELearningPlatform = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Initialize with mock data
  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    const mockCourses = [
      {
        id: 1,
        title: 'Web Development Bootcamp',
        instructor: 'Sarah Johnson',
        category: 'Programming',
        level: 'Beginner',
        duration: '40 hours',
        students: 1234,
        rating: 4.8,
        price: 49.99,
        description: 'Learn HTML, CSS, JavaScript, and React from scratch',
        lessons: [
          { id: 1, title: 'Introduction to HTML', duration: '45 min', completed: false },
          { id: 2, title: 'CSS Fundamentals', duration: '60 min', completed: false },
          { id: 3, title: 'JavaScript Basics', duration: '90 min', completed: false },
          { id: 4, title: 'React Essentials', duration: '120 min', completed: false }
        ]
      },
      {
        id: 2,
        title: 'Data Science with Python',
        instructor: 'Dr. Michael Chen',
        category: 'Data Science',
        level: 'Intermediate',
        duration: '60 hours',
        students: 856,
        rating: 4.9,
        price: 79.99,
        description: 'Master data analysis, visualization, and machine learning',
        lessons: [
          { id: 1, title: 'Python for Data Science', duration: '50 min', completed: false },
          { id: 2, title: 'Pandas & NumPy', duration: '70 min', completed: false },
          { id: 3, title: 'Data Visualization', duration: '55 min', completed: false },
          { id: 4, title: 'Machine Learning Intro', duration: '90 min', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Digital Marketing Masterclass',
        instructor: 'Emma Williams',
        category: 'Marketing',
        level: 'Beginner',
        duration: '30 hours',
        students: 2103,
        rating: 4.7,
        price: 39.99,
        description: 'Learn SEO, social media, and content marketing strategies',
        lessons: [
          { id: 1, title: 'Marketing Fundamentals', duration: '40 min', completed: false },
          { id: 2, title: 'SEO Strategies', duration: '65 min', completed: false },
          { id: 3, title: 'Social Media Marketing', duration: '50 min', completed: false }
        ]
      },
      {
        id: 4,
        title: 'UI/UX Design Principles',
        instructor: 'Alex Martinez',
        category: 'Design',
        level: 'Intermediate',
        duration: '35 hours',
        students: 945,
        rating: 4.8,
        price: 59.99,
        description: 'Create beautiful and functional user interfaces',
        lessons: [
          { id: 1, title: 'Design Thinking', duration: '45 min', completed: false },
          { id: 2, title: 'User Research', duration: '55 min', completed: false },
          { id: 3, title: 'Prototyping in Figma', duration: '80 min', completed: false }
        ]
      },
      {
        id: 5,
        title: 'Mobile App Development',
        instructor: 'James Rodriguez',
        category: 'Programming',
        level: 'Advanced',
        duration: '50 hours',
        students: 678,
        rating: 4.9,
        price: 89.99,
        description: 'Build native mobile apps for iOS and Android',
        lessons: [
          { id: 1, title: 'React Native Setup', duration: '40 min', completed: false },
          { id: 2, title: 'Component Architecture', duration: '75 min', completed: false },
          { id: 3, title: 'API Integration', duration: '60 min', completed: false }
        ]
      },
      {
        id: 6,
        title: 'Business Analytics',
        instructor: 'Lisa Thompson',
        category: 'Business',
        level: 'Beginner',
        duration: '25 hours',
        students: 1567,
        rating: 4.6,
        price: 44.99,
        description: 'Learn to make data-driven business decisions',
        lessons: [
          { id: 1, title: 'Analytics Fundamentals', duration: '35 min', completed: false },
          { id: 2, title: 'Excel for Business', duration: '50 min', completed: false },
          { id: 3, title: 'KPI Tracking', duration: '45 min', completed: false }
        ]
      }
    ];
    setCourses(mockCourses);
  };

  // Feature 1: User Authentication
  const handleAuth = () => {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const name = authMode === 'signup' ? document.getElementById('auth-name')?.value : null;

    if (!email || !password || (authMode === 'signup' && !name)) {
      alert('Please fill in all fields');
      return;
    }

    // Mock authentication
    const userData = {
      id: Date.now(),
      email,
      name: authMode === 'signup' ? name : email.split('@')[0],
      enrolledCourses: []
    };
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setEnrolledCourses([]);
    setActiveTab('browse');
  };

  // Feature 2: Course Search and Filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Feature 3: Course Enrollment
  const handleEnroll = (course) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    if (!enrolledCourses.find(c => c.id === course.id)) {
      const enrolledCourse = { ...course, enrolledDate: new Date(), progress: 0 };
      setEnrolledCourses([...enrolledCourses, enrolledCourse]);
      alert(`Successfully enrolled in "${course.title}"!`);
    }
  };

  // Feature 4: Progress Tracking
  const updateLessonProgress = (courseId, lessonId) => {
    setEnrolledCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map(lesson =>
          lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
        );
        const completedCount = updatedLessons.filter(l => l.completed).length;
        const progress = Math.round((completedCount / updatedLessons.length) * 100);
        return { ...course, lessons: updatedLessons, progress };
      }
      return course;
    }));
  };

  // Feature 5: Course Rating System
  const handleRating = (courseId, rating) => {
    alert(`You rated this course ${rating} stars!`);
  };

  const categories = ['all', 'Programming', 'Data Science', 'Marketing', 'Design', 'Business'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">LearnHub</h1>
            </div>
            
            <nav className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab('browse')}
                className={`font-medium ${activeTab === 'browse' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Browse Courses
              </button>
              {user && (
                <button
                  onClick={() => setActiveTab('my-courses')}
                  className={`font-medium ${activeTab === 'my-courses' ? 'text-blue-600' : 'text-gray-600'}`}
                >
                  My Courses
                </button>
              )}
            </nav>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setShowAuthModal(true); setAuthMode('login'); }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'browse' && (
          <>
            {/* Search and Filter Bar */}
            <div className="mb-8">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-white opacity-80" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {course.category}
                      </span>
                      <span className="text-sm text-gray-500">{course.level}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <User className="w-4 h-4" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                      <button
                        onClick={() => handleEnroll(course)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'my-courses' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">My Enrolled Courses</h2>
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">You haven't enrolled in any courses yet.</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
                        <p className="text-gray-600">{course.instructor}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-2">Progress</div>
                        <div className="text-3xl font-bold text-blue-600">{course.progress}%</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-700 mb-3">Course Lessons</h4>
                      {course.lessons.map(lesson => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                          onClick={() => updateLessonProgress(course.id, lesson.id)}
                        >
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : (
                              <PlayCircle className="w-6 h-6 text-gray-400" />
                            )}
                            <div>
                              <div className="font-medium text-gray-800">{lesson.title}</div>
                              <div className="text-sm text-gray-500">{lesson.duration}</div>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            lesson.completed 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {lesson.completed ? 'Completed' : 'Not Started'}
                          </div>
                        </div>
                      ))}
                    </div>

                    {course.progress === 100 && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                        <Award className="w-8 h-8 text-green-600" />
                        <div>
                          <div className="font-semibold text-green-800">Course Completed!</div>
                          <div className="text-sm text-green-600">Congratulations on finishing this course!</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {authMode === 'login' ? 'Login' : 'Sign Up'}
            </h2>
            <div className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="auth-name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="auth-email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="auth-password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleAuth}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                {authMode === 'login' ? 'Login' : 'Sign Up'}
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-blue-600 hover:underline text-sm"
              >
                {authMode === 'login' 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Login'}
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="ml-4 text-gray-600 hover:underline text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ELearningPlatform;