import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Home from './home/Home';
import Category from './categories/Category';
import Course from './courses/Course';
import CourseForm from './courses/CourseForm';
import ShowCourse from './courses/ShowCourse';
import Statistique from './statistiques/Statistique';

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
              <Route path="/statistique" element={<Statistique />} /> 
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>

  )
}

export default App
