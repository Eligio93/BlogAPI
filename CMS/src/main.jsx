import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import NewPost from './routes/NewPost.jsx'
import { AuthProvider } from '../components/AuthContext.jsx'

const router = createBrowserRouter([
  {
    path: "/newPost",
    element: <NewPost />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
