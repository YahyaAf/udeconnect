import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ShowCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://127.0.0.1:8000/api/v1/courses/${id}`)
      .then(response => {
        setCourse(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur :", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="mt-4 text-xl font-medium text-gray-600">Cours non trouvé</h2>
        <button 
          onClick={() => navigate('/course')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Retour à la liste des cours
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/course')}
            className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Retour aux cours
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-black to-indigo-600 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8 relative">
            <div className="absolute top-0 right-0 mt-6 mr-6 flex space-x-2">
              <button
                onClick={() => navigate(`/courses/update/${course.id}`)}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors"
                title="Modifier"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Voulez-vous vraiment supprimer ce cours?")) {
                    axios.delete(`http://127.0.0.1:8000/api/v1/courses/${id}`)
                      .then(() => navigate('/courses'))
                      .catch(error => console.error("Erreur lors de la suppression:", error));
                  }
                }}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                title="Supprimer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            
            <div className="z-10 relative">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{course.name}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {course.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-blue-100 max-w-2xl">{course.description}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Détails du cours
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-4 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Durée du cours</p>
                    <p className="text-lg font-semibold text-gray-800">{course.duration} heures</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Niveau de difficulté</p>
                    <p className="text-lg font-semibold text-gray-800">{course.difficulty_level}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Statut</p>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      course.status === 'Active' || course.status === 'Actif' ? 
                      'bg-green-100 text-green-800' : 
                      course.status === 'Draft' || course.status === 'Brouillon' ? 
                      'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {course.status}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-4 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Catégorie</p>
                    <p className="text-lg font-semibold text-gray-800">{course.category?.name || '-'}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Sous-catégorie</p>
                    <p className="text-lg font-semibold text-gray-800">{course.subcategory?.name || '-'}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Informations supplémentaires</p>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Créé le:</span> {formatDate(course.created_at)}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Mis à jour le:</span> {formatDate(course.updated_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCourse;