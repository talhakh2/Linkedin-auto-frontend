import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { saveUser } from "../store/features/AuthenticationSlice";
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import pic from '../Assets/pic.png';
import google from '../Assets/google.png';
import { GoogleLogin } from '@react-oauth/google';

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [blurEmail, setBlurEmail] = useState(false);
    const [blurPassword, setBlurPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('email') || sessionStorage.getItem('email');
        const storedPassword = localStorage.getItem('password') || sessionStorage.getItem('password');
        const storedRememberMe = localStorage.getItem('rememberMe') === 'true' || sessionStorage.getItem('rememberMe') === 'true';

        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(storedRememberMe);
        }
    }, []);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMe = () => {
        if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('rememberMe', true);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('rememberMe');
        }
    };

    const handleGoogleSuccess = async (response) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${apiUrl}/api/v1/users/google-signin`, {
                token: response.credential
            }, { withCredentials: true });

            const { user, accessToken, refreshToken } = res.data.data;
            dispatch(saveUser({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                via_google: user.via_google,
                plan: user.plan
            }));

            navigate('/dashboard');
        } catch (err) {
            setError(error.response.data.message);
        }
    };

    const handleGoogleError = (error) => {
        setError(error.response.data.message);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.post(`${apiUrl}/api/v1/users/login`, {
                email,
                password
            }, { withCredentials: true });

            const { user, accessToken, refreshToken } = response.data.data;
            dispatch(saveUser({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                via_google: user.via_google,
                plan: user.plan
            }));

            handleRememberMe();
            navigate('/dashboard');

        } catch (err) {
            if (err.response.status === 402) {
                sendVerificationCode();
            } else if (err.response && err.response.data) {
                setError(err.response.data.message || 'Login failed');
            } else {
                setError('An error occurred: ' + err.message);
            }
        }
    };

    const sendVerificationCode = async () => {
        navigate('/verification', { state: { email, action: 'verify' } });
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
          await axios.post(`${apiUrl}/api/v1/users/send-code`, { email, action: 'verify' }, { withCredentials: true });
        } catch (err) {
          if (err.response && err.response.data) {
            console.log(err.response.data.message || 'Failed to send OTP.');
          } else {
            console.log('An error occurred: ' + err.message);
          }
        }
      };

    return (
        <div className='w-full h-full'>
            <div className='grid md:grid-cols-2 grid-cols-1'>
                <div className='bg-[#3C82F6] items-center justify-center h-[100vh] md:flex hidden'>
                    <div className='flex flex-col items-center justify-center gap-5 p-10 px-20'>
                        <p className='text-xl text-white font-bold'>Join us!</p>
                        <p className='font-medium text-base text-white'>
                            "We’re excited to welcome you! Sign up and take your LinkedIn outreach to the next level with our advanced automation tool."
                        </p>
                        <div className='bg-white rounded-lg w-[70%] h-12 flex items-center justify-center mt-8'>
                            <p className="text-black text-xs font-medium">
                                log in or <span className='text-[#3C82F6] cursor-pointer' onClick={() => { navigate('/') }}>create an account</span>
                            </p>
                        </div>
                        <img src={pic} className='w-[300px] h-[300px]' alt="" />
                    </div>
                </div>
                <div className='w-full h-full'>
                    <div className='p-10 flex flex-col gap-5'>
                        <p className='text-black font-bold text-4xl text-center'>Welcome Back</p>
                        {error && (
                            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                                <strong className='font-bold'>Error: </strong>
                                <span className='block sm:inline'>{error}</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className='mt-4'>
                                <label htmlFor="email" className="mb-2 text-xs font-medium text-black">
                                    Email <span className='text-[#EC5252]'>*</span>
                                </label>
                                <input
                                    onFocus={() => setBlurEmail(true)}
                                    onBlur={() => setBlurEmail(false)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`border ${blurEmail ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurEmail ? "text-[#3C82F6]" : "text-black"} focus:outline-none rounded-lg w-full h-16 p-3`}
                                    placeholder="Enter Your Email"
                                    required
                                />
                            </div>
                            <div className='mt-4 relative'>
                                <label htmlFor="password" className="mb-2 text-xs font-medium text-black">
                                    Password <span className='text-[#EC5252]'>*</span>
                                </label>
                                <input
                                    onFocus={() => setBlurPassword(true)}
                                    onBlur={() => setBlurPassword(false)}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`border ${blurPassword ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurPassword ? "text-[#3C82F6]" : "text-black"} focus:outline-none rounded-lg w-full h-16 p-3`}
                                    placeholder="Enter Your Password"
                                    required
                                />
                                <div
                                    className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer text-[#D0D0D0]"
                                    onClick={handlePasswordToggle}
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </div>
                            </div>
                            <button type="submit" className='bg-[#3C82F6] rounded-lg text-center text-white font-bold text-base w-full h-16 mt-4'>
                                Login
                            </button>
                        </form>
                        <div className='w-full flex items-center justify-between mt-4'>
                            <div className='flex items-center gap-2'>
                                <input
                                    type="checkbox"
                                    className='w-5 h-4 rounded-lg'
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <p className='text-xs font-medium'>Remember me</p>
                            </div>
                            <div className=' cursor-pointer'>
                                <p className='text-[#3C82F6] text-xs font-normal' onClick={() => navigate('/forgot-password')}>Forget Password?</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-center space-x-4 mt-4'>
                            <div className='border-b border-b-black flex-1'></div>
                            <p className='text-black'>or</p>
                            <div className='border-b border-b-black flex-1'></div>
                        </div>
                        <div className='flex items-center justify-center gap-2 cursor-pointer mt-4'>
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
