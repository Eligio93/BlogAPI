import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../components/AuthContext"



export default function Login() {
    const navigate = useNavigate();
    const { jwt, setJwt, user, setUser } = useContext(AuthContext)
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
            const response = await axios.post('http://localhost:3000/user/login', data)
            let token = response.data.token
            localStorage.setItem('token', token)
            setJwt(token)
            setUser(response.data.user)
            setError()
            navigate('/')

        } catch (err) {
            setError(err.response.data.message)
        }
    }

    //handle changes of inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    return (
        <>  {/*in case there are errors*/}
            {error && <p>{error}</p>}
            {user ? (<p>You are already logged as {user.name}. Not you? <Link to='/logout'>LogOut</Link></p>) : (
                <form>
                    <label htmlFor="email">Email:
                        <input type="email" name="email" id="email" value={data.email} onChange={handleChange} />
                    </label>
                    <label htmlFor="password">Password:
                        <input type="password" name="password" id="password" value={data.password} onChange={handleChange} autoComplete="on" />
                    </label>
                    <button onClick={handleLogIn}>LogIn</button>
                </form>
            )}
        </>

    )
}