// App
import App from "./App";
//Features
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import AllUsers from "./features/user/AllUsers";
import UserProfile from "./features/user/UserProfile";
import UserSettings from "./features/setting/UserSettings";
// Components
import HomePage from "./components/static/HomePage";
import NotFound from "./components/error/NotFound";
import AuthWrapper from "./components/wrapper/AuthWrapper";

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
      },
      {
        path: "users/:id",
        element: <UserProfile/>
      },
      {
        path: "settings",
        element: (
          <AuthWrapper>
            <UserSettings/>
          </AuthWrapper>
        )
      }
    ]
  }
];

export default routesConfig;