// React
import { useEffect, useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../../features/popup/slices/popupSlice";
// Routing
import { useNavigate } from "react-router-dom";
// Components
import Loading from "../static/Loading";

export default function AuthWrapper({ children }) {
  // State
  const authUser = useSelector((state) => state.app.authUser);
  // Loading status
  const [loaded, setLoaded] = useState(false);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Check authentication on load
  useEffect(() => {
    if(!authUser) {
      dispatch(setPopup({
        message: "Authentication required",
        type: "error"
      }));

      // Redirect to home page
      navigate("/");
    }

    setLoaded(true);
  }, []);

  if(loaded && authUser) {
    return children;
  } else {
    return <Loading/>;
  }
};