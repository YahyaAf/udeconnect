import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6 flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Bienvenue sur <span className="text-indigo-600">UdeConnect</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore nos cours, développe tes compétences et deviens la meilleure version de toi-même.
          </p>
          <button onClick={() => navigate(`/course`)} className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition duration-300">
            Voir les cours
          </button>
        </div>
  
        <div className="mt-12 w-full max-w-xl">
          <img
            src="https://illustrations.popsy.co/gray/web-design.svg"
            alt="learning"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    );
  }
  