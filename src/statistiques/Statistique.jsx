import { useEffect, useState } from "react";
import axios from "axios";

export default function Statistique() {
  const [courseStats, setCourseStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState(null);
  const [tagStats, setTagStats] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v1/stats/courses")
      .then(response => setCourseStats(response.data))
      .catch(error => console.error("Erreur stats cours:", error));

    axios.get("http://127.0.0.1:8000/api/v1/stats/categories")
      .then(response => setCategoryStats(response.data))
      .catch(error => console.error("Erreur stats catégories:", error));

    axios.get("http://127.0.0.1:8000/api/v1/stats/tags")
      .then(response => setTagStats(response.data))
      .catch(error => console.error("Erreur stats tags:", error));
  }, []);

  if (!courseStats || !categoryStats || !tagStats) {
    return <p>Chargement des statistiques...</p>;
  }

  return (
    <div className="p-6 bg-white shadow rounded space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Statistiques des cours</h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Total des cours :</strong> {courseStats.total_courses}</li>
          <li><strong>Cours en cours :</strong> {courseStats.in_progress_courses}</li>
          <li><strong>Cours complétés :</strong> {courseStats.completed_courses}</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Statistiques des catégories</h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Total des catégories :</strong> {categoryStats.total_categories}</li>
          <li><strong>Catégories avec cours :</strong> {categoryStats.categories_with_courses}</li>
          <li><strong>Catégories sans cours :</strong> {categoryStats.categories_without_courses}</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Statistiques des tags</h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Total des tags :</strong> {tagStats.total_tags}</li>
          <li><strong>Tags avec cours :</strong> {tagStats.tags_with_courses}</li>
          <li><strong>Tags sans cours :</strong> {tagStats.tags_without_courses}</li>
        </ul>
      </div>
    </div>
  );
}
