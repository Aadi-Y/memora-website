import './ProfileInfo.css';
import {useState,useEffect} from "react";
import axiosInstance from "../utils/axiosInstance";
function ProfileInfo({onLogout,email}){
    async function getUserInfo(){
        try{
            const response = await axiosInstance.get("/get-user");

            if(response.data && response.data.users){
                setEmail(response.data.users[0].email)
            }
            else{
                setEmail('G');
            }
        }
        catch(err){
            if(err.response && err.response.data){
                console.log(err);
            }
            
        }
    }


    const initial = email ? email.split('')[0].toUpperCase() : "G";
    
    return( <>
                <div className="profile-container">
                    <div className="initial">
                        {initial}
                    </div>
                    <div className="logout-btn">
                        <button onClick={onLogout}>Logout</button>
                    </div>
                </div>
            </>)
}

export default ProfileInfo;