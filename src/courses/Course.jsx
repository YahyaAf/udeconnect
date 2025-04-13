import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  const fetchCourses = (query = "") => {
    setLoading(true);
    const url = query
      ? `http://127.0.0.1:8000/api/v1/courses/search?q=${query}`
      : `http://127.0.0.1:8000/api/v1/courses`;

    axios
      .get(url)
      .then((response) => {
        setCourses(response.data.data || response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCourses(); 
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchCourses(value); 
  };

  const deleteCourse = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/v1/courses/${id}`)
      .then(() => {
        setCourses(courses.filter((course) => course.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-50 to-indigo-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Rechercher un cours..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-black to-indigo-600 shadow-lg mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-indigo-500/30 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Liste des Cours</h1>
              <p className="text-blue-100 max-w-lg">Découvrez notre catalogue de formations et enrichissez vos compétences professionnelles</p>
            </div>
            <button
              onClick={() => navigate("/courses/create")}
              className="mt-4 md:mt-0 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Ajouter un cours
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-blue-600 font-medium">Chargement des cours...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="mt-4 text-xl text-gray-500">Aucun cours disponible.</p>
            <button
              onClick={() => navigate("/courses/create")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Créer votre premier cours
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-48 bg-gradient-to-r from-blue-400 to-indigo-500 overflow-hidden">
                  <img 
                    src="data:image/jpeg;base64,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" 
                    alt={course.name} 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 w-full">
                      <h2 className="text-xl font-bold text-white mb-1 line-clamp-2">{course.name}</h2>
                      <div className="flex flex-wrap gap-2">
                        {course.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex-grow">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">{course.duration} jours</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-sm text-gray-700">{course.difficulty_level}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <span className="text-sm text-gray-700">{course.status}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-sm text-gray-700">{course.category?.name || "-"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center flex-1 mr-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Voir
                    </button>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/courses/update/${course.id}`)} 
                        className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors"
                        title="Modifier"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}