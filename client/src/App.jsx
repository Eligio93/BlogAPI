import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const fetchUrl=import.meta.env.VITE_DEV_BASEURL || import.meta.env.VITE_PROD_URL

function App() {
  const [message, setMessage] = useState()
  useEffect(()=>{
    fetch(fetchUrl)
    .then(res=>res.json())
    .then(data=>setMessage(data.message))
  })

  return (
    <>
      <h1>{message}</h1>
    </>
  )
}

export default App
