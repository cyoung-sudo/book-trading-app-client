// App
import App from "./App";
//Features
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import AllUsers from "./features/user/AllUsers";
// Components
import HomePage from "./components/static/HomePage";
import NotFound from "./components/error/NotFound";

const routesConfig = [
  {
    path: "/", 
    element: <App/>,
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
      },
      {
        path: "users",
        element: <AllUsers/>
      }
    ]
  }
];

export default routesConfig;