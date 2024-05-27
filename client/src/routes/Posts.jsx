import axios from "axios";
import { useContext, useEffect, useState } from "react";
import postImg from '../img/postImg.jpg'
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";

export default function Posts() {
    const [posts, setPosts] = useState()
    const [featuredPosts, setFeaturedPosts] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState();
    const { user } = useContext(AuthContext)

    //insert error variable and loading icon in the finally
    useEffect(() => {
        async function getPosts() {
            try {
                let results = await axios.get('http://localhost:3000/blog/posts')
                setPosts(results.data)
                setFeaturedPosts(results.data.filter((post) => post.featured))
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        getPosts()
    }, [])


    // const featuredPosts= posts.filter((post)=>post.featured)
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="blog-section">
            <aside className="blog-aside">
                {user && <div className="blog-user">
                        <h2>Welcome {user.name}</h2>
                </div>}

                <div className="featured-posts">
                    <h2>Featured Posts</h2>
                    <ul>
                        {featuredPosts ? (
                            featuredPosts.map((post) =>
                                <li key={post._id}>
                                    <p>{post.title}</p>
                                </li>
                            )
                        ) : (<p>There s no featured posts</p>)}
                    </ul>
                </div>
            </aside>
            <div className='post-list'>
                {posts ? (
                    <ul>
                        {posts.map((post) =>

                            <li className="post" key={post._id}>
                                <img src={postImg} alt="" />
                                <h2>{post.title}</h2>
                                <p>{post.body_text}</p>
                                <Link to={`/posts/${post._id}`}>Read More</Link>
                            </li>

                        )}
                    </ul>
                ) : (
                    <p>There s no post to be seen </p >
                )
                }
            </div>

        </div>
    )
}