import "./Navbar.css";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../popup/slices/popupSlice";
import { resetUser } from "../../appSlice";
// Routing
import { NavLink, useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";

export default function Navbar() {
  // State
  const user = useSelector((state) => state.app.user);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Logout user
  const handleLogout = () => {
    authAPI.logout()
    .then(res => {
      dispatch(setPopup({
        message: "Successfully logged-out",
        type: "success"
      }));

      dispatch(resetUser());

      // Redirect to home page
      navigate("/")
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="navbar">
      <div id="navbar-logo">
        Book Trading Club
      </div>

      <ul id="navbar-links">
        <li>
          <NavLink
            to="users"
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined}>
            Users
          </NavLink>
        </li>

        {!user && 
          <li>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined}>
              Signup
            </NavLink>
          </li>
        }

        {!user &&
          <li>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined}>
              Login
            </NavLink>
          </li>
        }

        {user &&
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        }
      </ul>
    </div>
  );
};