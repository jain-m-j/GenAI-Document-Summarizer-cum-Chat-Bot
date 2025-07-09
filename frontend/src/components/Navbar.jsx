import { Routes, Route, Link, NavLink } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <nav>
      <Link to="/" className="title">
        Home
      </Link>

      <ul>
        <li>
          <NavLink to="/history">History</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
