import "./Navbar.css";
// Routing
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div id="navbar">
      <div id="navbar-logo">
        Book Trading Club
      </div>

      <ul id="navbar-links">
        <li>
          <NavLink
            to="signup"
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined}>
            Signup
          </NavLink>
        </li>

        <li>
          <NavLink
            to="login"
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined}>
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};