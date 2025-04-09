import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function CourseForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [status, setStatus] = useState("open");
  const [tags, setTags] = useState([]);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); 

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v1/categories").then((res) => {
      setCategories(res.data.data || res.data);
    });
    axios.get("http://127.0.0.1:8000/api/v1/tags").then((res) => {
      setAllTags(res.data.data || res.data);
    });
  }, []);

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`http://127.0.0.1:8000/api/v1/categories/${categoryId}`)
        .then((res) => {
          const subcats = res.data.subcategories || res.data.data.subcategories || [];
          setSubcategories(subcats);
        });
    } else {
      setSubcategories([]);
    }
  }, [categoryId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/v1/courses", {
        name,
        description,
        duration,
        difficulty_level: difficultyLevel,
        category_id: categoryId,
        subcategory_id: subcategoryId,
        status,
        tags,
      })
      .then(() => {
        setSuccess("Cours ajouté avec succès !");
        resetForm();
        navigate("/course"); 
      })
      .catch((err) => {
        console.error("Erreur lors de l’ajout :", err);
        setSuccess("Erreur lors de l’ajout du cours.");
      });
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setDuration("");
    setDifficultyLevel("");
    setCategoryId("");
    setSubcategoryId("");
    setStatus("open");
    setTags([]);
  };

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setTags(selected);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Ajouter un nouveau cours</h2>

      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom du cours"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows="4"
          required
        ></textarea>

        <input
          type="number"
          placeholder="Durée (en jours)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <select
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Niveau de difficulté</option>
          <option value="beginner">Débutant</option>
          <option value="intermediate">Intermédiaire</option>
          <option value="advanced">Avancé</option>
        </select>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Sous-catégorie</option>
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="open">Ouvert</option>
          <option value="in_progress">Fermé</option>
          <option value="completed">Fermé</option>
        </select>

        <select
          multiple
          value={tags}
          onChange={handleTagChange}
          className="w-full border p-2 rounded h-32"
        >
          {allTags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter le cours
        </button>
      </form>
    </div>
  );
}
