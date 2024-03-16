import Authors from "./Authors/Authors";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Root from "./Root/Root";

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