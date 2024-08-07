import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import userAvatar from '../img/userAvatar.svg'
import { AuthContext } from "../../components/AuthContext"
import CommentBox from "../../components/CommentBox"
import Loading from "../../components/Loading"
import {format} from "date-fns"

function Post() {
    const [post, setPost] = useState()
    const [comments, setComments] = useState()
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    let { postId } = useParams();
    const { user ,jwt } = useContext(AuthContext);
    

    //Get the single post with postId
    useEffect(() => {
        async function getPost() {
            try {
                let result = await axios.get(`${import.meta.env.VITE_SERVER_BASEURL}/blog/posts/${postId}`)
                setComments(result.data.comments)
                setPost(result.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setError(null)
                setLoading(false)
            }
        }
        getPost();
    }, [])

    //This happens when a comment get sended*/
    async function handleComment(e, message) {
        e.preventDefault();
        try {
            let result = await axios.post(`${import.meta.env.VITE_SERVER_BASEURL}/blog/posts/${postId}/comments/newComment`, {user, postId, message}, {headers: { Authorization: `Bearer ${jwt}` } })
            if (result.status == 200) {
                //result.data is the actual comment
                setComments((prev) => [...prev, result.data])
            }
        } catch (err) {
            setError(err.message)
        }

    }

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="post">
            <h1>{post.title}</h1>
            <div className="post-info">
                <img src={userAvatar} alt="" />
                <div className="post-author">
                    <p>{'Article written by ' + post.author.name}</p>
                    <p>{format((post.date), 'dd MMM yyyy')}</p>
                </div>
            </div>
            <img src={post.img} alt="" />
            <p className="post-description">{post.description}</p>
            <p className="post-body">{post.body_text}</p>

            <CommentBox
                comments={comments}
                user={user}
                handleComment={handleComment}
            />
        </div>
    )
}
export default Post