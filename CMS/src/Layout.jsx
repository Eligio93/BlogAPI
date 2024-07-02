import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import hamburgerIcon from "../src/img/hamburgerIcon.svg"
import { useState } from "react";
import { useEffect } from "react";

export default function Layout() {
    const { user, logOut } = useContext(AuthContext)
    const [mobileMenu, setMobileMenu] = useState(false)
    const location = useLocation();

    //close the menu everytime we change page
    useEffect(() => {
        setMobileMenu(false)
    }, [location])

    return (
        <>
            <div className="mobile-menu">
                <img onClick={() => setMobileMenu(!mobileMenu)} className='hamburger-menu' src={hamburgerIcon} alt="" />
                <nav className="mobile-sidebar" hidden={!mobileMenu} style={{ display: mobileMenu ? 'flex' : 'none' }}>
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
                        {user && <li className="logout-btn">
                            <Link onClick={logOut} >LogOut</Link>
                        </li>}
                    </ul>

                </nav>
            </div>
            <nav className="sidebar">
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
                    {user && <li className="logout-btn">
                        <Link onClick={logOut} >LogOut</Link>
                    </li>}
                </ul>
            </nav>
            <div></div>
            <div className="content">
                <Outlet />
            </div>
        </>
    )
}