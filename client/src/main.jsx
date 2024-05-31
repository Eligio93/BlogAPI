import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './routes/Signup.jsx'
import Login from './routes/Login.jsx'
import Layout from './Layout.jsx'
import Blog from './routes/Blog.jsx'
import Post from './routes/Post.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import { AuthProvider } from '../components/AuthContext.jsx'
import './style.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      },{
        path:'/posts',
        element : <Blog />
      },{
        path:'/posts/:postId',
        element: <Post />
      }
    ]
  },

])


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
