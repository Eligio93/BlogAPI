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

    async function handleLogin(e) {
        e.preventDefault()
        try {
            let result = await axios.post('http://localhost:3000/user/login', data)
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
    function handleGuestLogin() {
        setData({ email: 'guest@guest.com', password: 'guestguest' })
        // handleLogin()
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
    }


    return (
        <>
            <h1>Login</h1>
            {message && <p>{message}</p>}
            {error && <p>{error}</p> }
            <form onSubmit={handleLogin}>
                <label htmlFor="cms-email">Email
                </label>
                <input type="text" name="email" id='cms-email' autoComplete="true" value={data.email} onChange={handleChange} />
                <label htmlFor="cms-password">Password
                </label>
                <input type="password" name='password' id='cms-password' value={data.password} onChange={handleChange}/>
                <button type='submit'>Login</button>
                <button onClick={handleGuestLogin}>Guest Login</button>
            </form>
        </>
    )
}