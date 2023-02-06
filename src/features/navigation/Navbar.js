import "./Navbar.css";
// React
import { useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../popup/slices/popupSlice";
import { resetUser } from "../../appSlice";
// Routing
import { NavLink, useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";
// Icons
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  // Collapse toggle
  const [collapse, setCollapse] = useState(true);
  // State
  const authUser = useSelector((state) => state.app.authUser);
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
      navigate("/");
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="navbar">
      <div id="navbar-logo">
        Book Trading Club
      </div>

      <div id="navbar-collapse-toggle">
        <button onClick={() => setCollapse(state => !state)}>
          <GiHamburgerMenu size={25}/>
        </button>
      </div>

      {/*----- Expanded links -----*/}
      <ul id="navbar-links">
        <li>
          <NavLink
            to="users"
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined}>
            Users
          </NavLink>
        </li>

        <li>
          <NavLink
            to="books"
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined}>
            Books
          </NavLink>
        </li>

        <li>
          <NavLink
            to="trades"
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined}>
            Trades
          </NavLink>
        </li>

        {!authUser && 
          <li>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined}>
              Signup
            </NavLink>
          </li>
        }

        {!authUser &&
          <li>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined}>
              Login
            </NavLink>
          </li>
        }

        {authUser &&
          <li>
            <NavLink
              to="books/new"
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined}>
              Add Book
            </NavLink>
          </li>
        }

        {authUser &&
          <li>
            <NavLink
              to={`users/${authUser._id}`}
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined}>
              Profile
            </NavLink>
          </li>
        }

        {authUser &&
          <li>
            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined}>
              Settings
            </NavLink>
          </li>
        }

        {authUser &&
          <li>
            <button onClick={ handleLogout }>Logout</button>
          </li>
        }
      </ul>
      {/*----- /Expanded links -----*/}

      {/*----- Collapsed links -----*/}
      {!collapse &&
        <ul id="navbar-collapsed-links">
          <li>
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined}>
              Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="books"
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined}>
              Books
            </NavLink>
          </li>

          <li>
            <NavLink
              to="trades"
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined}>
              Trades
            </NavLink>
          </li>

          {!authUser && 
            <li>
              <NavLink
                to="signup"
                className={({ isActive }) =>
                  isActive ? "navbar-active" : undefined}>
                Signup
              </NavLink>
            </li>
          }

          {!authUser &&
            <li>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? "navbar-active" : undefined}>
                Login
              </NavLink>
            </li>
          }

          {authUser &&
            <li>
              <NavLink
                to="books/new"
                className={({ isActive }) =>
                  isActive ? "navbar-active" : undefined}>
                Add Book
              </NavLink>
            </li>
          }

          {authUser &&
            <li>
              <NavLink
                to={`users/${authUser._id}`}
                className={({ isActive }) =>
                  isActive ? "navbar-active" : undefined}>
                Profile
              </NavLink>
            </li>
          }

          {authUser &&
            <li>
              <NavLink
                to="settings"
                className={({ isActive }) =>
                  isActive ? "navbar-active" : undefined}>
                Settings
              </NavLink>
            </li>
          }

          {authUser &&
            <li>
              <button onClick={ handleLogout }>Logout</button>
            </li>
          }
        </ul>
      }
      {/*----- /Collapsed links -----*/}
    </div>
  );
};