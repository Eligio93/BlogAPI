import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "../../components/Form";
import Loading from "../../components/Loading";

export default function Post() {
    const { postId } = useParams()
    const [post, setPost] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPost() {
            try {
                let result = await axios.get(`http://localhost:3000/blog/posts/${postId}`)
                setPost(result.data)

            } catch (err) {
                setError(err.response.data.message)

            } finally {
                setLoading(false)
            }
        }
        getPost()

    }, [postId])

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let result = await axios.put(`http://localhost:3000/blog/posts/edit/${postId}`, post)
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
    function handleTextInput(e) {
        const { name, value } = e.target;
        setPost((prevData) => ({
            ...prevData, [name]: value
        }))
    }
    function handleCheckbox(e) {
        const { name, checked } = e.target;
        setPost(prevData => ({ ...prevData, [name]: checked }))

    }
    const handleEditor = (newValue, editorRef) => {
        setPost((prevData) => ({
            ...prevData, body_text: editorRef.getContent({ format: 'text' })
        }))
    }

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <Form
            data={post}
            handleSubmit={handleSubmit}
            handleTextInput={handleTextInput}
            handleFile={handleFile}
            handleCheckbox={handleCheckbox}
            handleEditor={handleEditor}
            disableField={true}
        />
    )
}