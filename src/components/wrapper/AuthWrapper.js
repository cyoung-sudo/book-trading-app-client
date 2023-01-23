// React
import { useEffect, useState } from "react";
// Redux
import { useDispatch } from "react-redux";
import { setPopup } from "../../features/popup/slices/popupSlice";
import { resetUser } from "../../appSlice";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";
// Components
import Loading from "../static/Loading";

export default function AuthWrapper({ children }) {
  // Requested data
  const [authed, setAuthed] = useState(false);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Check authentication on load
  useEffect(() => {
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        setAuthed(true);
      } else {
        dispatch(setPopup({
          message: "Authentication required",
          type: "error"
        }));
  
        dispatch(resetUser());
  
        // Redirect to home page
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(authed) {
    return children;
  } else {
    return <Loading/>;
  }
};