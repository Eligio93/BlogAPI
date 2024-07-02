import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useLocation } from "react-router-dom";
import loginIcon from "../src/img/loginIcon.svg"
import registerIcon from "../src/img/registerIcon.svg"
import logoutIcon from "../src/img/logoutIcon.svg"
import hamburgerIcon from "../src/img/hamburgerIcon.svg"



function Header() {
    const { user, setUser, logOut } = useContext(AuthContext);
    const [mobileMenu, setMobileMenu] = useState(false)
    const location = useLocation()
    /*closes the hamburger menu in case the location changes*/
    useEffect(() => {
        setMobileMenu(false)
    }, [location])

    return (
        <header>
            <div className="mobile-menu">
                <img onClick={() => setMobileMenu(!mobileMenu)} className="menuIcon" src={hamburgerIcon} alt="" />
                <div className='mobile-nav' hidden={!mobileMenu} style={{ display: mobileMenu ? 'flex' : 'none' }}>
                    {user ? (<div className="auth-btn">
                        <img className='authIcon' src={logoutIcon} alt="" />
                        <Link onClick={logOut}>Logout</Link>
                    </div>) : (<><div className="auth-btn">
                        <img className='authIcon' src={loginIcon} alt="" />
                        <Link to='/login'>Login</Link>
                    </div>
                        <div className="auth-btn">
                            <img className='authIcon' src={registerIcon} alt="" />
                            <Link to='/signup'>Register</Link>
                        </div></>)}

                </div>
            </div>
            <div className="auth-area">
                {user ? (
                    <div className="auth-btn">
                        <img className='authIcon' src={logoutIcon} alt="" />
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