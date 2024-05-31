import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [jwt, setJwt] = useState(localStorage.getItem('token'));


    useEffect(() => {
        //fetch user get called if the token exists but we dont  know if it s valid or not
        async function fetchUser(token) {
            try {
                //check if the token is valid calling the get user and passing the token we have saved in local storage
                let response = await axios.get('http://localhost:3000/user', { headers: { Authorization: `Bearer ${token}` } })
                let user = response.data.user;
                //if the response is okay return the user and doesn t touch the token
                return user
            } catch (err) {
                //if the response is not okay the token we have is not valid and gets removed from local storage 
                localStorage.removeItem('token')
                //set the JWT variable to null
                setJwt(null)
                //and this return null will setup the user
                return null
            }
        }

        async function getUser() {
            let token = localStorage.getItem('token')
            //if token is in local storage check if it s valid       
            if (token) {
                let user = await fetchUser(token);
                setUser(user)
            }
            else {
                //if it s not in local storage theres no user connected so reset variables
                setJwt(null)
                setUser(null)
            }
        }
        getUser()
    }, [jwt])

    function logOut() {
        localStorage.removeItem('token')
        setUser(null)
        setJwt(null)
    }



    return (
        <AuthContext.Provider value={{ user, setUser, jwt, setJwt, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}
