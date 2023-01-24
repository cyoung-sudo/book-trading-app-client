// App
import App from "./App";
//Features
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import AllUsers from "./features/user/AllUsers";
import UserProfile from "./features/user/UserProfile";
import UserSettings from "./features/setting/UserSettings";
import AllBooks from "./features/book/AllBooks";
import AddBook from "./features/book/AddBook";
import Request from "./features/trade/Request";
import Offer from "./features/trade/Offer";
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
        path: "books",
        element: <AllBooks/>
      },
      {
        path: "trades/request",
        element: (
          <AuthWrapper>
            <Request/>
          </AuthWrapper>
        )
      },
      {
        path: "trades/offer",
        element: (
          <AuthWrapper>
            <Offer/>
          </AuthWrapper>
        )
      },
      {
        path: "settings",
        element: (
          <AuthWrapper>
            <UserSettings/>
          </AuthWrapper>
        )
      },
      {
        path: "book/new",
        element: (
          <AuthWrapper>
            <AddBook/>
          </AuthWrapper>
        )
      }
    ]
  }
];

export default routesConfig;