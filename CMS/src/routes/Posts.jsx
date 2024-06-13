import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Posts() {
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
        <ul>
            {posts.map((post) =>
                <li key={post._id}>
                    <h2>{post.title}</h2>
                </li>
            )}
        </ul>
    )
}