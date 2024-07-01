import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../components/AuthContext"
import { useNavigate } from "react-router-dom"
export default function Home() {
    const { user, jwt} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { message: 'You need to be logged in to see the content' } })
        }

    },[])


    return(
        <>
        {user && <h2>Welcome {user.name}</h2>}
        </>
    )

}