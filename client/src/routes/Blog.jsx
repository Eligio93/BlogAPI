import axios from "axios";
import { useContext, useEffect, useState } from "react";
import postImg from '../img/postImg.jpg'
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";
import Loading from '../../components/Loading'

export default function Blog() {
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
                setPosts(results.data.filter((post)=>post.published))
                setFeaturedPosts(results.data.filter((post) => post.featured))
            } catch (err) {
                setError(err.message)
            } finally {
                setTimeout(()=>{
                    setLoading(false)
                },1000)
               
            }
        }
        getPosts()
    }, [])


    // const featuredPosts= posts.filter((post)=>post.featured)
    if (loading) {
        return <Loading />
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
                    <ul className="featured-posts-list">
                        {featuredPosts ? (
                            featuredPosts.map((post) =>
                                <li key={post._id}>
                                    <Link to={'/posts/' + post._id}>{post.title}</Link>
                                </li>
                            )
                        ) : (<p>There s no featured posts</p>)}
                    </ul>
                </div>
            </aside>

            {posts ? (
                <ul className="post-list">
                    {posts.map((post) =>

                        <li className="post-preview" key={post._id}>
                            <img src={post.img} alt="" />
                            <div className="post-preview-info">
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                <Link to={`/posts/${post._id}`} className="read-more-btn">Read More</Link>
                            </div>

                        </li>

                    )}
                </ul>
            ) : (
                <p>There s no post to be seen </p >
            )
            }


        </div>
    )
}