import { useEffect, useState } from "react";
import axios from "axios";

export default function Statistique() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v1/stats/courses")
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des statistiques :", error);
      });
  }, []);

  if (!stats) return <p>Chargement des statistiques...</p>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Statistiques des cours</h2>
      <ul className="space-y-2 text-gray-700">
        <li><strong>Total des cours :</strong> {stats.total_courses}</li>
        <li><strong>Cours en cours :</strong> {stats.in_progress_courses}</li>
        <li><strong>Cours complétés :</strong> {stats.completed_courses}</li>
      </ul>
    </div>
  );
}
