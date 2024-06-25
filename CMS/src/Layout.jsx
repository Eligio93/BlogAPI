import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function Layout() {
    const { user, logOut } = useContext(AuthContext)

    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/posts'>All Posts</Link>
                    </li>
                    <li>
                        <Link to='/posts/status/published'>Published Posts</Link>
                    </li>
                    <li>
                        <Link to='/posts/status/unpublished'>Unpublished posts</Link>
                    </li>
                    <li>
                        <Link to='/newPost'>Add New Post</Link>
                    </li>
                    {user && <li>
                        <Link onClick={logOut} >LogOut</Link>
                    </li>}
                </ul>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </>
    )
}