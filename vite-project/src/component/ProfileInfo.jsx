import './ProfileInfo.css';
import { FiLogOut } from 'react-icons/fi';

function ProfileInfo({ onLogout, email }) {
    const initial = email ? email.charAt(0).toUpperCase() : "?";

    return (
        <div className="profile">
            <div className="profile__avatar" title={email}>
                {initial}
            </div>
            <button className="profile__logout" onClick={onLogout} title="Logout">
                <FiLogOut />
                <span className="profile__logout-text">Logout</span>
            </button>
        </div>
    );
}

export default ProfileInfo;