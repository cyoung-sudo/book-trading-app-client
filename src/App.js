// React
import { useEffect, useState } from "react";
// Redux
import { useDispatch } from "react-redux";
import { setUser } from "./appSlice";
// Routing
import { Outlet } from "react-router-dom";
// APIs
import * as authAPI from "./apis/authAPI";
// Features
import Navbar from "./features/navigation/Navbar";
import Popup from "./features/popup/Popup";
// Components
import Footer from "./components/static/Footer";
import Loading from "./components/static/Loading";

export default function App() {
  // Loading status
  const [loaded, setLoaded] = useState(false);
  // Hooks
  const dispatch = useDispatch();

  //----- Check authentication on load
  useEffect(() => {
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        dispatch(setUser(res.data.user));
      }

      setLoaded(true);
    })
    .catch(err => console.log(err));
  }, []);

  if(loaded) {
    return (
      <div>
        <Navbar/>
        <Popup/>
        <Outlet/>
        <Footer/>
      </div>
    );
  } else {
    return <Loading/>;
  }
};