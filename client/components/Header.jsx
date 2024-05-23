import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";



function Header() {
    const { user, setUser,logOut } = useContext(AuthContext);


    return (
        <header>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/posts'>Blog Posts</Link>
                <Link to='/about'>About</Link>
            </nav>
            <h1>DrinkSofa</h1>
            <div className="social">
            </div>
            <div className="authArea">
                {user ? (
                    <div className="headerLogout">
                        <img src="" alt="" />
                        <Link onClick={logOut}>Logout</Link>
                    </div>
                ) : (
                    <>
                        <div className="headerLogin">
                            <img src="" alt="" />
                            <Link to='/login'>Login</Link>
                        </div>
                        <div className="headerRegister">
                            <img src="" alt="" />
                            <Link to='/signup'>Register</Link>
                        </div>
                    </>
                )}
            </div>

        </header>
    )
}

export default Header