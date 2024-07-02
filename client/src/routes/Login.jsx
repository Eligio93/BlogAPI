import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../components/AuthContext"
import loginImg from '../img/loginImg.jpg'



export default function Login() {
    const navigate = useNavigate();
    const { jwt, setJwt, user, setUser, logOut } = useContext(AuthContext)
    const [data, setData] = useState({
        email: '',
        password: ''
    }
    )
    const [error, setError] = useState()

    //handle logIn when  login button clicked
    const handleLogIn = async (e) => {
        e.preventDefault(e);
        try {
            //fetch data to server and get the response in json
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASEURL}/user/login`, data)
            let token = response.data.token
            localStorage.setItem('token', token)
            setJwt(token)
            setUser(response.data.user)
            setError()
            /* -1 brings back the user to the page where he was before to login*/
            navigate(-1)

        } catch (err) {
            setError(err.response.data.message)
        }
    }
    //handle Guest Login
    const handleGuestLogin = function () {
        setData({ email: 'guest@guest.com', password: 'guestguest' })
        handleLogIn()
    }

    //handle changes of inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    return (
        <>
            <div className="login">
                <img src={loginImg} alt="" />

                {user ? (<p>You are already logged as {user.name}. Not you? <Link to='/' onClick={logOut}>LogOut</Link></p>) : (
                    <form className="form" onSubmit={handleLogIn}>
                        {error && <p className="error-msg">{error}</p>}
                        <label htmlFor="email">Email:
                        </label>
                        <input type="email" name="email" id="email" value={data.email} onChange={handleChange} required />
                        <label htmlFor="password">Password:
                        </label>
                        <input type="password" name="password" id="password" value={data.password} onChange={handleChange} autoComplete="on" required minLength={6} />
                        <button type="submit" className="login-btn">LogIn</button>
                        <button className="login-btn" onClick={handleGuestLogin}>Guest Login</button>
                    </form>
                )}

            </div>

        </>

    )
}