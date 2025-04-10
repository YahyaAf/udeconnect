import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ShowCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/v1/courses/${id}`)
      .then(response => {
        setCourse(response.data.data);
      })
      .catch(error => console.error("Erreur :", error));
  }, [id]);

  if (!course) return <p>Chargement...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-blue-700">{course.name}</h2>
      <p className="text-gray-700">{course.description}</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p><strong>Durée :</strong> {course.duration} heures</p>
          <p><strong>Niveau :</strong> {course.difficulty_level}</p>
          <p><strong>Status :</strong> {course.status}</p>
        </div>
        <div>
          <p><strong>Catégorie :</strong> {course.category?.name}</p>
          <p><strong>Sous-catégorie :</strong> {course.subcategory?.name}</p>
          <p><strong>Tags :</strong> {course.tags?.join(', ')}</p>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p>Créé le : {course.created_at}</p>
        <p>Mis à jour le : {course.updated_at}</p>
      </div>
    </div>
  );
}

export default ShowCourse;
