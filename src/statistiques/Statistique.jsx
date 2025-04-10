import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3, Layers, Tags } from "lucide-react";

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
    return <p className="text-center text-lg mt-10 text-gray-500">Chargement des statistiques...</p>;
  }

  const cards = [
    {
      title: "Cours",
      icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
      data: [
        { label: "Total des cours", value: courseStats.total_courses },
        { label: "Cours en cours", value: courseStats.in_progress_courses },
        { label: "Cours complétés", value: courseStats.completed_courses },
      ],
      bg: "bg-indigo-50",
    },
    {
      title: "Catégories",
      icon: <Layers className="w-8 h-8 text-teal-600" />,
      data: [
        { label: "Total des catégories", value: categoryStats.total_categories },
        { label: "Avec cours", value: categoryStats.categories_with_courses },
        { label: "Sans cours", value: categoryStats.categories_without_courses },
      ],
      bg: "bg-teal-50",
    },
    {
      title: "Tags",
      icon: <Tags className="w-8 h-8 text-pink-600" />,
      data: [
        { label: "Total des tags", value: tagStats.total_tags },
        { label: "Avec cours", value: tagStats.tags_with_courses },
        { label: "Sans cours", value: tagStats.tags_without_courses },
      ],
      bg: "bg-pink-50",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Statistiques Générales</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className={`rounded-xl shadow-md ${card.bg} p-5`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-white shadow">{card.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              {card.data.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b pb-1">
                  <span>{item.label}</span>
                  <span className="font-bold">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
