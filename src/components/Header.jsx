import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or Title */}
        <h1 className="text-xl font-bold">MyApp</h1>

        {/* Navigation Links */}
        <ul className="flex gap-6">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/category"
              className="hover:text-blue-400 transition duration-200"
            >
              Category
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
