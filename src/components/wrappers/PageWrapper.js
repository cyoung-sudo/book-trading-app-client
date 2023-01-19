// Routing
import { Outlet } from "react-router-dom";
// Features
import Navbar from "../../features/navigation/Navbar";
// Components
import Footer from "../static/Footer";

export default function PageWrapper() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
};