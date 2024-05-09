import './index.css';

import Root from "./Root/Root";
import Home from "./Pages/Home/Home";
import Authors from "./Pages/Authors/Authors";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContextProvider from "./ContextProvider/ContextProvider";
import Image from "./Pages/Image/Image";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "*",
    element: <Root/>,
    children: [
      {
        path: "",
        element: <Home/>
      }, {
        path: "artist", 
        element: <Authors />
      }, {
        path: "login", 
        element: <Login />
      }, {
        path: "register", 
        element: <Register />
      }, {
        path: "artist/:author",
        element: <Home/>
      }, {
        path: "image/:id",
        element: <Image />
      }
    ]
  }
]);

export default function App() {
  return (
    <>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
    </>
  )
}