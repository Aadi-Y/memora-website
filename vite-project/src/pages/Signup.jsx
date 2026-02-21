import Navbar from '../component/Navbar';
import googleImage from '../assets/Google-image.png';
import { useState } from 'react';
import './Signup.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import React from 'react';
import { validateEmail } from '../utils/validate';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import NavText from '../component/NavText';
import Spinner from '../component/Spinner';

function Signup() {
    const [email, setEmail] = useState("");
    const [orgPassword, setOrgPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [orgVisible, setOrgVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        if (!validateEmail(email)) {
            setError("Please provide valid Email address.");
            return;
        }
        if (!orgPassword) {
            setError("Please provide the Password.");
            return;
        }
        if (!confirmPassword) {
            setError("Please provide the Confirm Password");
            return;
        }
        setError("");
        setIsLoading(true);

        //Signup API
        try {
            const response = await axiosInstance.post("/signup", {
                email,
                orgPassword,
                confirmPassword

            });

            if (response.data && response.data.error) {
                setError(response.data.error.message);
            }

            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                toast.success(response.data.message);
                navigate("/dashboard");
            }
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
            else {
                setError("Unexpected error occured please try again");
            }
        } finally {
            setIsLoading(false);
        }


    }
    function handleEmail(event) {
        setEmail(event.target.value);
    }
    function handleOrgPassword(event) {
        setOrgPassword(event.target.value);
    }
    function handleConfirmPassword(event) {
        setConfirmPassword(event.target.value);
    }
    function toggleVisibility1() {
        setOrgVisible((prev) => !prev);
    }
    function toggleVisibility2() {
        setConfirmVisible((prev) => !prev);
    }

    return (<>
        <NavText />
        <div className="signup-page">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Create Account</h2>
                    <p>Sign up to start organizing your notes</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="signup-email">Email</label>
                        <div className="input-wrapper">
                            <input id="signup-email"
                                type="email"
                                placeholder='you@example.com'
                                onChange={handleEmail}
                                value={email} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="signup-password">Password</label>
                        <div className="input-wrapper">
                            <input id="signup-password"
                                type={orgVisible ? "text" : "password"}
                                placeholder='Create a strong password'
                                onChange={handleOrgPassword}
                                value={orgPassword} />
                            <span className="eye-toggle" onClick={toggleVisibility1}>
                                {orgVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="signup-confirm">Confirm Password</label>
                        <div className="input-wrapper">
                            <input id="signup-confirm"
                                type={confirmVisible ? "text" : "password"}
                                placeholder='Re-enter your password'
                                onChange={handleConfirmPassword}
                                value={confirmPassword} />
                            <span className="eye-toggle" onClick={toggleVisibility2}>
                                {confirmVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </span>
                        </div>
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button className='signup-submit' type='submit' disabled={isLoading}>
                        {isLoading ? <><Spinner /> Creating Account...</> : "Create Account"}
                    </button>
                    <p className="redirect">Already have an account?<a href="/login">Log in</a></p>
                </form>
                <div className="divider"><span>or</span></div>
                <button className='google-signup'>
                    <img src={googleImage} alt="Google" />
                    Continue with Google
                </button>
            </div>
        </div>
    </>)
}

export default Signup;