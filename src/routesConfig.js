//Features
import Login from "./features/auth/Login";
// Components
import HomePage from "./components/static/HomePage";
import NotFound from "./components/error/NotFound";

const routesConfig = [
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <NotFound/>
  },
  {
    path: "login",
    element: <Login/>
  }
];

export default routesConfig;