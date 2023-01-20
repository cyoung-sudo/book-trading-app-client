import "./UserProfile.css";
// React
import { useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import { setPopup } from "../popup/slices/popupSlice";
// Routing
import { useParams, useNavigate } from "react-router-dom";
// APIs
import * as userAPI from "../../apis/userAPI";
// Components
import Loading from "../../components/static/Loading";

export default function UserProfile() {
  // State
  const user = useSelector((state) => state.user.user);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //----- Retrieve user on load
  useEffect(() => {
    userAPI.getUser(id)
    .then(res => {
      if(res.data.success) {
        dispatch(setUser(res.data.user));
      } else {
        dispatch(setPopup({
          message: res.data.message,
          type: "error"
        }));

        // Redirect to users page
        navigate("/users")
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(user) {
    return (
      <div id="userProfile">
        <div id="userProfile-header">
          <h1>{user.username}'s Profile</h1>
        </div>
      </div>
    );
  } else {
    return <Loading/>;
  }
};