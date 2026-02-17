import "./Navbar.css";
import ProfileInfo from "./ProfileInfo";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FiBookOpen } from "react-icons/fi";

function Navbar({
  search: SearchComponent,
  handleSearch,
  handleClearSearchValue,
}) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function onLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  async function getUser() {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.users) {
        setEmail(response.data.users[0].email);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="dash-nav">
      <div className="dash-nav__left">
        <Link to="/dashboard" className="dash-nav__brand">
          <FiBookOpen className="dash-nav__brand-icon" />
          <span>Memora</span>
        </Link>
      </div>
      <div className="dash-nav__center">
        <SearchComponent
          handleSearch={handleSearch}
          handleClearSearchValue={handleClearSearchValue}
        />
      </div>
      <div className="dash-nav__right">
        <ProfileInfo onLogout={onLogout} email={email} />
      </div>
    </nav>
  );
}

export default Navbar;
