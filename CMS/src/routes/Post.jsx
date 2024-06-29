import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "../../components/Form";
import Loading from "../../components/Loading";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";

export default function Post() {
    const { postId } = useParams();
    const { jwt, user } = useContext(AuthContext)
    const navigate = useNavigate();
    const [post, setPost] = useState();
    const [success, setSuccess] = useState()
    const [commentDeleted, setCommentDeleted] = useState(false)
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { message: 'You need to be logged in to see the content' } })
        }

    })

    useEffect(() => {
        async function getPost() {
            try {
                let result = await axios.get(`http://localhost:3000/blog/posts/${postId}`)
                setPost(result.data)
                setError()
            } catch (err) {
                setError(err.response.data.message)

            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)

            }
        }
        getPost()

    }, [postId, commentDeleted])

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let result = await axios.put(`http://localhost:3000/blog/posts/edit/${postId}`, post, { headers: { Authorization: `Bearer ${jwt}` } })
            console.log(result)
            if (result.status === 200) {
                setSuccess(result.data.message)
                setError()
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

    async function handleDelete(e) {
        e.preventDefault();
        try {
            let result = await axios.delete(`http://localhost:3000/blog/posts/delete/${postId}`, { data: post, headers: { Authorization: `Bearer ${jwt}` } })
            if (result.status === 200) {
                setSuccess(result.data.message)
                setError()
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
    async function handleDeleteComment(comment) {
        setLoading(true);
        try {
            let result = await axios.delete(`http://localhost:3000/blog/posts/${postId}/comments/delete/${comment._id}`, { data: comment, headers: { Authorization: `Bearer ${jwt}` } })
            console.log(result)
            if (result.status === 200) {
                //this makes the whole component to re render
                setCommentDeleted(true)
            }
        } catch (err) {
            /*if the user is unathorized*/
            if (err.response.status === 401) {
                navigate('/login', { state: { message: 'To delete a comment you need to Login' } })
            }
            setError(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <p>{error}</p>
    }
    if (success) {
        return <p>{success}</p>
    }

    return (
        <>
            <h2>Blog Post</h2>
            <Form
                data={post}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                handleTextInput={handleTextInput}
                handleCheckbox={handleCheckbox}
                handleEditor={handleEditor}
                disableField={true}
                deleteBtn={true}
                btnName={'Edit Post'}
            />
            <h2>Post Comments</h2>
            {post.comments.length < 1 ? <p>This post has no comments</p> :
                <ul>
                    {post.comments.map((comment =>
                        <li key={comment._id}>
                            <p>{comment.message}</p>
                            <button className="red-btn" onClick={() => handleDeleteComment(comment)}>Delete</button>
                        </li>
                    ))}
                </ul>
            }

        </>


    )
}