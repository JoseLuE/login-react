import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home'
import Login from './Login';
import Register from './Register'
import User from './User'
import Moderator from './Moderator'
import Admin from './Admin'

const router = createBrowserRouter([
  {path: "/", element: <Home />},
  {path: "/register",element: <Register />},
  {path: "/login",element: <Login />,},
  {path: "/user",element: <User />,},
  {path: "/moderator",element: <Moderator />,},
  {path: "/admin",element: <Admin />,},
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)