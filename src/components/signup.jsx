import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import pic from '../Assets/pic.png';
import google from '../Assets/google.png';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [blurName, setBlurName] = useState(false);
    const [blurEmail, setBlurEmail] = useState(false);
    const [blurPassword, setBlurPassword] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await axios.post(`${apiUrl}/api/v1/users/register`, {
                fullName,
                email,
                password
            });
            
            console.log('Registration successful:', response.data);
            navigate('/verification', { state: { email, action: 'verify' } });

        } catch (err) {
            console.log(err);
            if (err.response)
                setError(err.response.data.message)
            else
                setError('Registration failed');
        }
    };

    const handleGoogleSignupSuccess = async (credentialResponse) => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await axios.post(`${apiUrl}/api/v1/users/google-signup`, {
                token: credentialResponse.credential,
            });
            navigate('/login')
            console.log('Google Signup successful:', response.data);

        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const handleGoogleSignupFailure = (error) => {
        setError(error.response.data.message);
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
                                Already have an Account? <span className='text-[#3C82F6] cursor-pointer' onClick={() => { navigate('/login') }}>Log in</span>
                            </p>
                        </div>
                        <img src={pic} className='w-[300px] h-[300px]' alt="" />
                    </div>
                </div>
                <div className='w-full h-full'>
                    <div className='p-10 flex flex-col gap-5'>
                        <p className='text-black font-bold text-4xl text-center'>Create An Account</p>
                        {error && (
                            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                                <strong className='font-bold'>Error: </strong>
                                <span className='block sm:inline'>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="mb-2 text-xs font-medium text-black">
                                    Full Name <span className='text-[#EC5252]'>*</span>
                                </label>
                                <input
                                    onFocus={() => setBlurName(true)}
                                    onBlur={() => setBlurName(false)}
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className={`border ${blurName ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurName ? "text-[#3C82F6]" : "text-black"} focus:outline-none rounded-lg w-full h-16 p-3`}
                                    placeholder="Enter Your Full Name"
                                    required
                                />
                            </div>
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
                                    minLength={8}
                                    required
                                />
                                <div
                                    className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer text-[#D0D0D0]"
                                    onClick={handlePasswordToggle}
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </div>
                            </div>
                            <div className='flex items-center gap-2 w-full mt-4'>
                                <input type="checkbox" className='w-5 h-4 rounded-lg' required />
                                <p className='text-xs font-medium'>I agree with the <span className='text-[#3C82F6]'>Terms of services</span> and <span className='text-[#3C82F6]'>Privacy Policy</span></p>
                            </div>
                            <button type="submit" className='bg-[#3C82F6] rounded-lg text-center text-white font-bold text-base w-full h-16 mt-4'>
                                Sign Up
                            </button>
                        </form>
                        <div className='flex items-center justify-center space-x-4 mt-6'>
                            <div className='border-b border-b-black flex-1'></div>
                            <p className='text-black'>or</p>
                            <div className='border-b border-b-black flex-1'></div>
                        </div>

                        <div className='flex items-center justify-center gap-2 cursor-pointer mt-6'>
                            <GoogleLogin
                                onSuccess={handleGoogleSignupSuccess}
                                onError={handleGoogleSignupFailure}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
