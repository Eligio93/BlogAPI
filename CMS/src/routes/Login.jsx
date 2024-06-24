import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function Login(){
    const [message,setMessage]=useState()
    const location = useLocation()
    useEffect(()=>{
        if(location.state){
            setMessage(location.state.message)
        }
    },[])
    


    return(
        <>
        <h1>Login</h1>
        <p>{message}</p>
        </>
    ) 
}