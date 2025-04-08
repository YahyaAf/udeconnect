import { Link } from "react-router-dom";

export default function Header(){

    return(
        <>
        <nav className="p-4 bg-gray-800 text-white">
          <ul className="flex gap-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category">Category</Link></li>
          </ul>
        </nav>
        </>
    )
}