import Navbar from '../component/Navbar';
import googleImage from '../assets/Google-image.png';
import {useState} from 'react';
import './Signup.css';
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai';
import React from 'react';
import { validateEmail } from '../utils/validate';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {toast , ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import NavText from '../component/NavText';

function Signup(){
    const [email,setEmail] = useState("");
    const [orgPassword,setOrgPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [orgVisible,setOrgVisible] = useState(false);
    const [confirmVisible,setConfirmVisible] = useState(false);
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        if(!validateEmail(email)){
            setError("Please provide valid Email address.");
            return;
        }
        if(!orgPassword){
            setError("Please provide the Password.");
            return;
        }
        if(!confirmPassword){
            setError("Please provide the Confirm Password");
            return;
        }
        setError("");

        //Signup API
        try{
            const response = await axiosInstance.post("/signup",{
                email,
                orgPassword,
                confirmPassword
                
            });

            console.log(response);
            console.log(response.data);

            if(response.data && response.data.error){
                setError(response.data.error.message);
            }

            if(response.data && response.data.token){
                localStorage.setItem("token",response.data.token);
                toast.success(`${response.data.message}`,{
                    autoClose:3000
                });
                setTimeout(()=>{
                    navigate("/dashboard");
                },3000)
                
            }
        }
        catch(err){
            if(err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message);
            }
            else{
                setError("Unexpected error occured please try again");
            }
        }


    }
    function handleEmail(event){
        setEmail(event.target.value);
    }
    function handleOrgPassword(event){
        setOrgPassword(event.target.value);
    }
    function handleConfirmPassword(event){
        setConfirmPassword(event.target.value);
    }
    function toggleVisibility1(){
        setOrgVisible((prev)=>!prev);
    }
    function toggleVisibility2(){
        setConfirmVisible((prev)=>!prev);
    }

    return( <>
                <NavText/>
                <div className="container1">
                <div className="inside1">
                    <form onSubmit={handleSubmit}>
                        <h2 className='signup'>Signup</h2>
                        <div className='input-email'>
                            <input type="email" 
                                   placeholder='Email'
                                   onChange={handleEmail}
                                   value={email} />
                        </div>
                        <div className="input-password">
                            <input type={orgVisible ? "text" : "password"} 
                                   placeholder='Create password'
                                   onChange={handleOrgPassword}
                                   value={orgPassword} />
                                   {
                                    orgVisible ? <AiOutlineEye className='eye-icon-signup' onClick={toggleVisibility1}/> : <AiOutlineEyeInvisible className='eye-icon-signup' onClick={toggleVisibility1}/>
                                   }
                        </div>
                        <div className="input-confirmPassword">
                            <input type={confirmVisible ? "text":"password"} 
                                   placeholder='Confirm password'
                                   onChange={handleConfirmPassword}
                                   value={confirmPassword} />
                                   {
                                    confirmVisible ? <AiOutlineEye className='eye-icon-signup' onClick = {toggleVisibility2}/> : <AiOutlineEyeInvisible className='eye-icon-signup'
                                    onClick=
                                    {toggleVisibility2}
                                    />
                                   }
                        </div>
                        <p className="error-message">{error}</p>
                        <button className='signup-btn' type='submit'>Signup</button>
                        <p>Already have an account?<span><a href="/login">Login</a></span></p>
                    </form>
                    <div>
                        <h2>Or</h2>
                        <button className='google-btn'>
                            <span><img src={googleImage} alt="" className='google-image'/></span>
                            Signup with Google
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
            </>)
}

export default Signup;