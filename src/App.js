// React
import { useEffect } from "react";
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

export default function App() {
  // Hooks
  const dispatch = useDispatch();

  //----- Check authentication on load
  useEffect(() => {
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        dispatch(setUser(res.data.user));
      }
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Navbar/>
      <Popup/>
      <Outlet/>
      <Footer/>
    </div>
  );
};