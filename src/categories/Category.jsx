import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data || response.data); // in case you wrapped it in 'data'
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/v1/categories", { name })
      .then((res) => {
        setSuccess("Category created successfully!");
        setName("");
        fetchCategories(); 
      })
      .catch((err) => {
        console.error("Error creating category:", err);
        setSuccess("Error creating category");
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Category List</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="border p-2 mr-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </form>

      {success && <p className="text-green-600 mb-4">{success}</p>}

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <ul className="list-disc pl-5">
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
