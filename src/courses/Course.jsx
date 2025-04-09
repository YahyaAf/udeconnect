import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/courses")
      .then((response) => {
        setCourses(response.data.data || response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Liste des Cours</h1>
        <button
          onClick={() => navigate("/courses/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Ajouter un cours
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Chargement des cours...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-500">Aucun cours disponible.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{course.name}</h2>
              <p className="text-gray-700 text-sm mb-4">{course.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {course.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Durée :</strong> {course.duration} jours</p>
                <p><strong>Niveau :</strong> {course.difficulty_level}</p>
                <p><strong>Statut :</strong> {course.status}</p>
                <p><strong>Catégorie :</strong> {course.category?.name || "-"}</p>
                <p><strong>Sous-catégorie :</strong> {course.subcategory?.name || "-"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
