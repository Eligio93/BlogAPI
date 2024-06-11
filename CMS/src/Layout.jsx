import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout(){


    return(
        <>
        <div className="sidebar">
            <h2>Sidebar</h2>
            <ul>
                <li>
                    <Link to='/posts'>All Posts</Link>
                </li>
                <li>
                    
                </li>
            </ul>
        </div>
        <div className="content">
            <h2>Content</h2>
        </div>
        </>
    )
}