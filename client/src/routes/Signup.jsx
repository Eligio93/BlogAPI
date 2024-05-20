import { useState } from "react";
import axios from 'axios'
import { Navigate } from "react-router-dom";



export default function Signup() {
    const [data, setData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        is_pro: true,
        admin: true
    })
    const [fetchingError, setFetchingError] = useState()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
    }
    async function handleSubmit(e) {
        e.preventDefault(e);
        try {
            const response = await axios.post('http://localhost:3000/blog/signup', data)
            if (response.status === 200) {
                window.location.href='/'
            }
        } catch (err) {
            setFetchingError(err.message)
        }
    }
    return (
        <>
            {fetchingError && <p>{fetchingError}</p>}
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