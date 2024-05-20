import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



export default function Signup() {
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
            const response = await axios.post('http://localhost:3000/blog/signup', data)
            if (response.status === 200) {
                setServerResponse(response.data.message)
                //show the successful creating for 2 seconds than redirect to home
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            {fetchingError && <p>{fetchingError}</p>}
            {serverResponse && <p>{serverResponse}</p>}
            <form>
                <label htmlFor="name">Name:
                    <input type="text" name="name" id="name" value={data.name} onChange={handleChange} />
                </label>
                <label htmlFor="lastName">LastName:
                    <input type="text" name="lastName" id="lastName" value={data.lastName} onChange={handleChange} />
                </label>
                <label htmlFor="email">Email:
                    <input type="email" name="email" id="email" value={data.email} onChange={handleChange} />
                </label>
                <label htmlFor="password">Password:
                    <input type="password" name="password" id="password" value={data.password} onChange={handleChange} autoComplete="on" />
                </label>
                <button onClick={handleSubmit}>Invia</button>
            </form>
        </>
    )
}