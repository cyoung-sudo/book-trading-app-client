//Features
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
// Components
import HomePage from "./components/static/HomePage";
import NotFound from "./components/error/NotFound";
import PageWrapper from "./components/wrapper/PageWrapper";

const routesConfig = [
  {
    path: "/", 
    element: <PageWrapper/>,
    children:[
      {
        path: "/",
        element: <HomePage/>,
        errorElement: <NotFound/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "signup",
        element: <Signup/>
      }
    ]
  }
];

export default routesConfig;