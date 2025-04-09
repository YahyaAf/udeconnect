import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(""); // 👈 nouveau champ
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data || response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      parent_id: parentId || null,
    };

    const endpoint = editingId
      ? `http://127.0.0.1:8000/api/v1/categories/${editingId}`
      : "http://127.0.0.1:8000/api/v1/categories";

    const method = editingId ? axios.put : axios.post;

    method(endpoint, data)
      .then(() => {
        setSuccess(`Category ${editingId ? "updated" : "created"} successfully!`);
        setName("");
        setParentId("");
        setEditingId(null);
        fetchCategories();
      })
      .catch((err) => {
        console.error("Error saving category:", err);
        setSuccess("Error saving category");
      });
  };

  const handleEdit = (category) => {
    setName(category.name);
    setParentId(category.parent_id || ""); // 👈 Pré-remplir le select
    setEditingId(category.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/v1/categories/${id}`)
        .then(() => {
          setSuccess("Category deleted successfully!");
          fetchCategories();
        })
        .catch((err) => {
          console.error("Error deleting category:", err);
          setSuccess("Error deleting category");
        });
    }
  };

  const cancelEdit = () => {
    setName("");
    setParentId("");
    setEditingId(null);
    setSuccess("");
  };

  const renderCategories = (categoriesList, level = 0) => {
    return (
      <ul className="pl-4 space-y-2">
        {categoriesList.map((category) => (
          <li key={category.id} className={`bg-white p-3 rounded shadow-sm border`}>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">{category.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="mt-2">{renderCategories(category.subcategories, level + 1)}</div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Category Manager</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">No parent category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

      <div>
        {loading ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : categories.length > 0 ? (
          renderCategories(categories)
        ) : (
          <p className="text-gray-500">No categories found.</p>
        )}
      </div>
    </div>
  );
}
