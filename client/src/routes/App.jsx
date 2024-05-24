import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../components/AuthContext'
import backgroundImage from '../img/backgroundImg.jpg'


const fetchUrl=import.meta.env.VITE_DEV_BASEURL || import.meta.env.VITE_PROD_URL

function App() {
  const{user}= useContext(AuthContext)
  return (
    <>
    <div className="hero" style={{backgroundImage: `url(${backgroundImage})`}}>
      <h1>Welcome to EC API Blog</h1>
      <p>A small blog where you can discover a piece of Australia</p>
      <div className="hero-btns">
        <Link to='/posts'>Explore Blog</Link>
      </div>
    </div>
    </>
  )
}

export default App
