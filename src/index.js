import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Routing
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routesConfig from "./routesConfig";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <RouterProvider router={ router } />
    </Provider>
  </React.StrictMode>
);