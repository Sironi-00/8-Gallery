import Root from "./Root/Root";
import Home from "./Pages/Home/Home";
import Authors from "./Pages/Authors/Authors";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Root/>,
    children: [
      {
        path: "",
        element: <Home/>
      }, {
        path: "authors", 
        element: <Authors />
      }, {
        path: "login", 
        element: <Login />
      }, {
        path: "register", 
        element: <Register />
      }, {
        path: ":author",
        element: <Home/>
      },
    ]
  }
]);

export default function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}