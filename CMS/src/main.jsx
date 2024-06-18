import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Layout from './Layout.jsx'
import Login from './routes/Login.jsx'
import NewPost from './routes/NewPost.jsx'
import { AuthProvider } from '../components/AuthContext.jsx'
import PostList from './routes/PostList.jsx'
import Post from './routes/Post.jsx'


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
      }, {
        path: '/posts',
        element: <PostList />
      },
       {
        path: '/posts/status/:status',
        element: <PostList />
      },
      {
        path:'/posts/:postId',
        element:<Post />
      }
    ]
  }, {
    path: '/login',
    element: <Login />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
