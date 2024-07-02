import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import loginIcon from "../src/img/loginIcon.svg"
import registerIcon from "../src/img/registerIcon.svg"
import logoutIcon   from "../src/img/logoutIcon.svg"



function Header() {
    const { user, setUser, logOut } = useContext(AuthContext);


    return (
        <header>
            <div className="auth-area">
                {user ? (
                    <div className="auth-btn">
                        <img className='authIcon'src={logoutIcon} alt="" />
                        <Link onClick={logOut}>Logout</Link>
                    </div>
                ) : (
                    <>
                        <div className="auth-btn">
                            <img className='authIcon' src={loginIcon} alt="" />
                            <Link to='/login'>Login</Link>
                        </div>
                        <div className="auth-btn">
                            <img className='authIcon' src={registerIcon} alt="" />
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