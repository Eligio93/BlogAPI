import { useState, useContext } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";
import signUpImg from '../img/signupImg.jpg'




export default function Signup() {
    const { user, setUSer, logOut } = useContext(AuthContext)
    //hook to redirect the user after signup
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
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
    //handle submit signup form
    async function handleSubmit(e) {
        e.preventDefault(e);
        try {
            //fetch data to server and get the response in json
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASEURL}/user/signup`, data)
            if (response.status === 200) {
                setServerResponse(response.data.message)
                //show the successful creating for 2 seconds than redirect to home
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
        } catch (err) {
            setFetchingError(err.response.data.message)
        }
    }
    //handle checkbox to change admin status
    function handleCheckbox(e) {
        setData(prevData => ({
            ...prevData,
            admin: e.target.checked
        }));

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
                    <input type="password" name="password" id="su-password" value={data.password} onChange={handleChange} autoComplete="on" required minLength={6} />

                    <label htmlFor="su-admin">Admin:
                    </label>
                    <input type="checkbox" name="admin" id='su-admin' checked={data.admin} onChange={handleCheckbox} />

                    <button type="submit" className="signup-btn">Sign up</button>
                </form>)}

        </div>
    )
}