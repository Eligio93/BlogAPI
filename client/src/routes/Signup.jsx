import { useState, useContext } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";




export default function Signup() {
    const { user, setUSer } = useContext(AuthContext)
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
            {fetchingError && <p>{fetchingError}</p>}
            {serverResponse && <p>{serverResponse}</p>}
            {user ? (
                <>
                    <p>To register a new account you need to logOut first</p>
                    <Link to='/logout'>Logout</Link>

                </>
            ) : (
                <form className="form">
                    <label htmlFor="su-name">Name:
                    </label>
                    <input type="text" name="name" id="su-name" value={data.name} onChange={handleChange} />

                    <label htmlFor="su-lastName">LastName:
                    </label>
                    <input type="text" name="lastName" id="su-lastName" value={data.lastName} onChange={handleChange} />

                    <label htmlFor="su-email">Email:
                    </label>
                    <input type="email" name="email" id="su-email" value={data.email} onChange={handleChange} />

                    <label htmlFor="su-password">Password:
                    </label>
                    <input type="password" name="password" id="su-password" value={data.password} onChange={handleChange} autoComplete="on" />

                    <button onClick={handleSubmit}>Sign up</button>
                </form>)}

        </div>
    )
}