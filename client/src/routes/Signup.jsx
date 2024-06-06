import { useState, useContext } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";
import signUpImg from '../img/signupImg.jpg'




export default function Signup() {
    const { user, setUSer,logOut } = useContext(AuthContext)
    //hook to redirect the user after signup
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        is_pro: true,
        admin: true
    })
    const [fetchingError, setFetchingError] = useState()
    const [serverResponse, setServerResponse] = useState();

    //handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
    }
    async function handleSubmit(e) {
        e.preventDefault(e);
        try {
            //fetch data to server and get the response in json
            const response = await axios.post('http://localhost:3000/user/signup', data)
            if (response.status === 200) {
                setServerResponse(response.data.message)
                //show the successful creating for 2 seconds than redirect to home
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }
        } catch (err) {
            console.log(err)
            setFetchingError(err.message)
        }
    }
    return (
        <div className="signUp">
            <img src={signUpImg} alt="" />
            {user ? (
            <p>You are already logged as {user.name}. <Link to='/' onClick={logOut}>LogOut</Link> to register a new Account</p>) : (
                <form className="form" onSubmit={handleSubmit}>
                    {fetchingError && <p className="error-msg">{fetchingError}</p>}
                    {serverResponse && <p className="success-msg">{serverResponse}</p>}

                    <label htmlFor="su-name">Name:
                    </label>
                    <input type="text" name="name" id="su-name" value={data.name} onChange={handleChange} required />

                    <label htmlFor="su-lastName">Last Name:
                    </label>
                    <input type="text" name="lastName" id="su-lastName" value={data.lastName} onChange={handleChange} required />

                    <label htmlFor="su-email">Email:
                    </label>
                    <input type="email" name="email" id="su-email" value={data.email} onChange={handleChange} required />

                    <label htmlFor="su-password">Password:
                    </label>
                    <input type="password" name="password" id="su-password" value={data.password} onChange={handleChange} autoComplete="on" required />

                    <button type="submit" className="signup-btn">Sign up</button>
                </form>)}

        </div>
    )
}