import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordToggle = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            await axios.post(`${apiUrl}/api/v1/users/reset-password`, { password, email }, { withCredentials: true });

            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Failed to update password.');
            } else {
                setError('An error occurred: ' + err.message);
            }
        }
    };

    if (!email) return null;

    return (
        <div className="w-full flex gap-4 justify-center items-center min-h-screen bg-[#F1F2F7] px-5">
            <div className="lg:w-[28%] w-full border bg-white flex items-center justify-center gap-2 flex-col border-[#F1F1F1] rounded-[20px] boxShadow md:py-10 py-5 md:px-10 px-5">
                <h2 className="text-lg font-semibold text-[#101828]">Set New Password</h2>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 relative">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-2 border rounded-lg"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                            />
                            <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#D0D0D0]"
                                onClick={handlePasswordToggle}
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full p-2 border rounded-lg"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={8}
                            />
                            <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#D0D0D0]"
                                onClick={handleConfirmPasswordToggle}
                            >
                                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </div>
                        </div>
                        {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="py-3 text-center w-full text-base font-semibold rounded-lg bg-[#3C82F6] text-white transition-all duration-300"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
