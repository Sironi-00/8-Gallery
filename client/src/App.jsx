import Root from "./Root/Root";
import Home from "./Pages/Home/Home";
import Authors from "./Pages/Authors/Authors";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContextProvider from "./ContextProvider/ContextProvider";

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
      },
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