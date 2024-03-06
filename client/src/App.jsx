import Authors from "./Authors/Authors";
import Home from "./Home/Home";
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
      }
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