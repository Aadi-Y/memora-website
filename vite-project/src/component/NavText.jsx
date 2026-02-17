import "./NavText.css";
import { Link, useLocation } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";

function NavText() {
    const location = useLocation();
    const isLogin = location.pathname === "/login";
    const isSignup = location.pathname === "/signup";

    return (
        <nav className="public-nav">
            <Link to="/" className="public-nav__brand">
                <FiBookOpen className="public-nav__icon" />
                <span>Memora</span>
            </Link>
            <div className="public-nav__links">
                {!isLogin && (
                    <Link to="/login" className="public-nav__link">
                        Log in
                    </Link>
                )}
                {!isSignup && (
                    <Link to="/signup" className="public-nav__link public-nav__link--cta">
                        Sign up free
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default NavText;