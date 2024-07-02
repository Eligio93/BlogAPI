import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../components/AuthContext"
import { useNavigate } from "react-router-dom"
export default function Home() {
    const { user, jwt } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { message: 'You need to be logged in to see the content' } })
        }

    }, [])


    return (
        <div className="rules-area">
            {user && <h2>Welcome {user.name}</h2>}
            <h3>Set of Rules</h3>
            <ul  className="rules-list">
                <li>
                    <p> With the sidebar on the left you can navigate through all posts in the blog </p>
                </li>
                
                <li>
                    <p> To add a new post just click on 'Add new Post' button </p>
                </li>
                <li>
                    <p> To Edit a post just click on the post you want to Edit and then once you are done just click 'Edit' button </p>
                </li>
                <li>
                    <p> Post dates can't be edited and it will always be the date of when the post is been created </p>
                </li>
                <li>
                    <p> Once the post is created you can't edit the picture related to the post </p>
                </li>
                <li>
                    <p> You can choose to publish/unpublish posts and feature them. If the post is not published you can't feature it </p>
                </li>
            </ul>
        </div>
    )

}