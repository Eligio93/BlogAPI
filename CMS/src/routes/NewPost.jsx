import { useState, useEffect} from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import Loading from '../../components/Loading';



export default function NewPost() {
    const { user,jwt} = useContext(AuthContext);
    const navigate = useNavigate();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState()
    const [data, setData] = useState({
        title: '',
        description: '',
        body: '',
        author: 'Eligio',
        published: true,
        featured: false
    });

    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { message: 'You need to be logged in to see the content' } })
        }

    })

    //handle the loading file
    function handleFile(e) {
        setFile(e.target.files[0])
    }


    //handle form Submit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('img', file)
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('body', data.body)
        formData.append('author', data.author)
        formData.append('published', data.published)
        formData.append('featured', data.featured)
        try {
            let result = await axios.post('http://localhost:3000/blog/posts/newPost', formData ,{ headers: { Authorization: `Bearer ${jwt}` } })
            if (result.status === 200) {
                setSuccess(result.data.message)
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    //handle checkboxes
    function handleCheckbox(e) {
        const { name, checked } = e.target;
        setData(prevData => ({ ...prevData, [name]: checked }))
    }

    //handle Post Description Input
    function handleTextInput(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
    }
    //handle Post Editor Change
    const handleEditor = (newValue, editorRef) => {
        setData((prevData) => ({
            ...prevData, body: editorRef.getContent({ format: 'text' })
        }))
    }


    if (loading) {
        return <Loading />
    }
    return (
        <>
            {success ? (<p>{success}</p>) : (
                <>
                {error && <p>{error}</p>}
                <Form
                    handleSubmit={handleSubmit}
                    handleTextInput={handleTextInput}
                    handleFile={handleFile}
                    handleCheckbox={handleCheckbox}
                    handleEditor={handleEditor}
                    data={data}
                    disableField={false}
                    deleteBtn={false}
                    btnName={'Create Post'}
                />
                </>
            )}

        </>

    )


}