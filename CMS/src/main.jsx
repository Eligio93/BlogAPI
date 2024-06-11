import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Layout from './Layout.jsx'
import Login from './routes/Login.jsx'
import NewPost from './routes/NewPost.jsx'
import { AuthProvider } from '../components/AuthContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: "/newPost",
        element: <NewPost />
      }

    ]
  },{
    path:'/login',
    element:<Login />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
