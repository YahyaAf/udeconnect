import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du fetch des catégories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Chargement des catégories...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des Catégories</h2>
      <ul className="list-disc pl-5">
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}
