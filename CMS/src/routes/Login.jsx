import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../components/AuthContext";
import axios from "axios";

export default function Login() {
    const [message, setMessage] = useState();
    const { user, setUser, jwt, setJwt } = useContext(AuthContext)
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState();
    const location = useLocation()
    const navigate = useNavigate()
    /*this use effect get any message coming from different page location*/
    useEffect(() => {
        if (location.state) {
            setMessage(location.state.message)
        }
    }, [])
    //handle submit form 
    async function handleLogin(e) {
        e.preventDefault()
        try {
            let result = await axios.post(`${import.meta.env.VITE_SERVER_BASEURL}/user/login`, data)
            let token = result.data.token
            localStorage.setItem('token', token)
            setJwt(token)
            setUser(result.data.user)
            setError()
            navigate('/')

        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
        }
    }
    //Set email and password in case of a guest login
    function handleGuestLogin() {
        setData({ email: 'guest@guest.com', password: 'guestguest' })
    }

    //handle input change
    function handleChange(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
    }


    return (
        <div className="login-area">
            <h1>Login</h1>
            {message && <p>{message}</p>}
            {error && <p className="error-msg">{error}</p>}
            <form onSubmit={handleLogin} className="form">
                <label htmlFor="cms-email">Email
                </label>
                <input type="text" name="email" id='cms-email' autoComplete="true" value={data.email} onChange={handleChange} required />
                <label htmlFor="cms-password">Password
                </label>
                <input type="password" name='password' id='cms-password' value={data.password} onChange={handleChange} required />
                <button type='submit' className="yellow-btn">Login</button>
                <button onClick={handleGuestLogin} className="yellow-btn">Guest Login</button>
            </form>
        </div>
    )
}