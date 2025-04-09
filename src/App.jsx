import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from './test'
import Header from './components/header';
import Footer from './components/footer';
import Home from './home/Home';
import Category from './categories/Category';
import Course from './courses/Course';

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
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
