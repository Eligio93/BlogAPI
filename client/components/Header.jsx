import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";



function Header() {
    const { user, setUser, logOut } = useContext(AuthContext);


    return (
        <header>
            <div className="auth-area">
                {user ? (
                    <div className="auth-btn">
                        <img src="" alt="" />
                        <Link onClick={logOut}>Logout</Link>
                    </div>
                ) : (
                    <>
                        <div className="auth-btn">
                            <img src="" alt="" />
                            <Link to='/login'>Login</Link>
                        </div>
                        <div className="auth-btn">
                            <img src="" alt="" />
                            <Link to='/signup'>Register</Link>
                        </div>
                    </>
                )}
            </div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/posts'>Blog</Link>
                <Link to='/about'>About</Link>
            </nav>

        </header>
    )
}

export default Header