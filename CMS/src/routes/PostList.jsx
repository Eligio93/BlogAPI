import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import userIcon from '../img/userIcon.svg'
import commentIcon from '../img/commentIcon.svg'
import calendarIcon from '../img/calendarIcon.svg'

export default function PostList() {
    const navigate = useNavigate()
    const { status } = useParams();
    const [posts, setPosts] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPosts() {
            try {
                let results = await axios.get('http://localhost:3000/blog/posts');
                if (status === 'published') {
                    setPosts(results.data.filter((post) => post.published))
                } else if (status === 'unpublished') {
                    setPosts(results.data.filter((post) => !post.published))
                } else {
                    setPosts(results.data)
                }

            } catch (err) {
                setError(er.message)
            } finally {
                setLoading(false)
            }
        }
        getPosts();
    }, [status])

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <ul className="post-list">
            {posts.map((post) =>

                <li key={post._id} className="listed-post" onClick={() => navigate(`/posts/${post._id}`)}>

                    <h2>{post.title}</h2>
                    <div className="listed-post-info">
                        <div className="listed-post-author">
                            <img src={userIcon} alt="" />
                            <p>{post.author}</p>
                        </div>
                        <div className="listed-post-comments">
                            <img src={commentIcon} alt="" />
                            <p>{post.comments.length}</p>
                        </div>
                        <div className="listed-post-date">
                            <img src={calendarIcon} alt="" />
                            <p>{post.date}</p>
                        </div>
                    </div>

                </li>


            )}
        </ul>
    )
}