import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../Component/Home";
import AddUser from "../Component/AddUser";
import AllUser from "../Component/AllUser";
import Update from "../Component/Update";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:'/add',
        element:<AddUser></AddUser>
      },{
        path:'/all',
        element:<AllUser></AllUser>,
        loader:()=> fetch('http://localhost:5000/users')
      },
      {
        path:'/update/:id',
        element:<Update></Update>,
        loader:({params}) => fetch(`http://localhost:5000/users/${params.id}`)
      }
    ],
  },
]);
export default Router;
