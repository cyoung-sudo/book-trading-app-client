// Routing
import { Outlet } from "react-router-dom";
// Features
import Navbar from "../../features/navigation/Navbar";
import Popup from "../../features/popup/Popup";
// Components
import Footer from "../static/Footer";

export default function PageWrapper() {
  return (
    <div>
      <Navbar/>
      <Popup/>
      <Outlet/>
      <Footer/>
    </div>
  );
};