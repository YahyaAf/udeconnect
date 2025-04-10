import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from './test'
import Header from './components/header';
import Footer from './components/footer';
import Home from './home/Home';
import Category from './categories/Category';
import Course from './courses/Course';
import CourseForm from './courses/CourseForm';
import ShowCourse from './courses/ShowCourse';

function App() {

  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category" element={<Category />} />
              <Route path="/course" element={<Course />} />
              <Route path="/courses/create" element={<CourseForm />} />
              <Route path="/courses/update/:id" element={<CourseForm />} /> 
              <Route path="/courses/:id" element={<ShowCourse />} /> 
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>

  )
}

export default App
