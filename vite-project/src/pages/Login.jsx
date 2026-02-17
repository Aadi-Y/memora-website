import Navbar from "../component/Navbar";
import './Login.css';
import googleImage from '../assets/Google-image.png';
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import { validateEmail } from "../utils/validate";
import axiosInstance from "../utils/axiosInstance";
import toast from 'react-hot-toast';
import NavText from "../component/NavText";

function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [visible,setVisible] = useState(false);
    const [error,setError] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        if(!validateEmail(email)){
            setError("Please provide valid Email address.");
            return;
        }

        if(!password){
            setError("Please provide the Password");
            return;
        }

        setError("");

        try{
            const response = await axiosInstance.post("/login",{
                email:email,
                password:password
            });

            if(response.data && response.data.token){
                localStorage.setItem("token",response.data.token)
                toast.success(response.data.message);
                navigate("/dashboard");
                
            }
        }
        
        catch(err){
            
            if(err.response){
                setError(err.response.data.message);
            }
            else{
                setError("Unexpected error occured please try again");
            }
        }
    }

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

    // useEffect(()=>{
    //     getUserInfo();
    //     return () => {};
    // },[handleSubmit])

    function handleEmail(event){
        setEmail(event.target.value);
    }
    function handlePassword(event){
        setPassword(event.target.value);
    }
    function toggleVisibility(){
        setVisible((prev)=>!prev);
    }

    
    
    return( <>
                <NavText/>
                <div className="login-page">
                    <div className="login-card">
                        <div className="login-header">
                            <h2>Welcome Back</h2>
                            <p>Log in to access your notes</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="login-email">Email</label>
                                <div className="input-wrapper">
                                    <input id="login-email"
                                           type="email" 
                                           placeholder="you@example.com"
                                           onChange={handleEmail}
                                           value={email} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="login-password">Password</label>
                                <div className="input-wrapper">
                                    <input id="login-password"
                                           type={visible ? "text" : "password"}
                                           placeholder="Enter your password"
                                           onChange={handlePassword}
                                           value={password} />
                                    <span className="eye-toggle" onClick={toggleVisibility}>
                                        {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                    </span>
                                </div>
                            </div>
                            {error && <p className="error-msg">{error}</p>}
                            <a href="" className="forgot-link">Forgot Password?</a>
                            <button className="login-submit" type="submit">Log In</button>
                            <p className="redirect">Don't have an account?<a href="/signup">Sign up</a></p>
                        </form>
                        <div className="divider"><span>or</span></div>
                        <button className="google-login">
                            <img src={googleImage} alt="Google" />
                            Continue with Google
                        </button>
                    </div>
                </div>
            </>)
}

export default Login;