import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
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

    if (editingId) {
      axios
        .put(`http://127.0.0.1:8000/api/v1/categories/${editingId}`, { name })
        .then(() => {
          setSuccess("Category updated successfully!");
          setName("");
          setEditingId(null);
          fetchCategories();
        })
        .catch((err) => {
          console.error("Error updating category:", err);
          setSuccess("Error updating category");
        });
    } else {
      axios
        .post("http://127.0.0.1:8000/api/v1/categories", { name })
        .then(() => {
          setSuccess("Category created successfully!");
          setName("");
          fetchCategories();
        })
        .catch((err) => {
          console.error("Error creating category:", err);
          setSuccess("Error creating category");
        });
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
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
    setEditingId(null);
    setSuccess("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {editingId ? "Edit Category" : "Add Category"}
      </h2>

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
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      {success && <p className="text-green-600 mb-4">{success}</p>}

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <ul className="list-disc pl-5">
          {categories.map((category) => (
            <li
              key={category.id}
              className="mb-2 flex items-center justify-between"
            >
              <span>{category.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
