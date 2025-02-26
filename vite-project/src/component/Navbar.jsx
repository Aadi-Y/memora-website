import "./Navbar.css";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
// import Search from './Search';
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import NavText from "./NavText";
function Navbar({
  search: SearchComponent,
  handleSearch,
  handleClearSearchValue,
}) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  function onLogout() {
    navigate("/");
    localStorage.removeItem("token");

  }

  async function getUser() {
    const response = await axiosInstance.get("/get-user");
    if (response.data && response.data.users) {
      setEmail(response.data.users[0].email);
      return;
    }
    if (response.data.error) {
      console.log(response.data.message);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-profileInfo-container">
          <NavText className="navtext"/>
          <ProfileInfo onLogout={onLogout} email={email} />
        </div>
        <div className="navbar-search-container">
            <SearchComponent
            handleSearch={handleSearch}
            handleClearSearchValue={handleClearSearchValue}
            />
        </div>
        
      </div>
    </>
  );
}
export default Navbar;
