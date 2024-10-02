import React, { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';

const Settings = () => {

    const navigate = useNavigate()
    
    const userID = useSelector((state) => state.authentication.userID);

    const fullName = useSelector((state) => state.authentication.fullName);
    const email = useSelector((state) => state.authentication.email);
    const via_google = useSelector((state) => state.authentication.via_google);
    const plan = useSelector((state) => state.authentication.plan);

    const [userData, setUserData] = useState({});

    // const [userData, setUserData] = useState({})

    const [blurEmail, setBlurEmail] = useState(false);
    const [blurPassword, setBlurPassword] = useState(false);
    const [blurConfirmPassword, setBlurConfirmPassword] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = process.env.REACT_APP_API_URL;
            try {
                const response = await axios.get(
                    `${apiUrl}/api/v1/users/current-user`,
                    { withCredentials: true }
                );
                console.log(response.data);
                // Handle response here
                setUserData(response.data.data);
            } catch (err) {
                // Handle error here
                console.error('Error fetching data:', err);
            }
        };


        fetchData();
      
    }, []); // Add dependencies to re-run the effect if they change


    const handleChangePassword = async (e) => {
        e.preventDefault(); // Prevents default form submission
        setSuccessMessage('');
        setErrorMessage('');

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            return;
        }
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const payload = { oldPassword, newPassword };
            const response = await axios.post(
                `${apiUrl}/api/v1/users/change-password`,
                payload ,
                { withCredentials: true }
            );
            setSuccessMessage(response.data.message);
            setErrorMessage('');
        } catch (err) {
            setErrorMessage(err.response.data.message);
            setSuccessMessage('');
        }
    };

    return (
        <div className='flex-1 transition-margin duration-300 md:ml-[16%] p-4 bg-white'>
            <div className='p-10 flex flex-col gap-10'>
                {/* basic info card  */}
                <div className='flex flex-col gap-5 shadow-md p-5'>
                    <p className='font-semibold text-black text-3xl'>Basic Information</p>
                    <div className='flex flex-col items-start gap-1'>
                        <p className='text-[#344054] text-sm font-medium'>Name</p>
                        <p className='text-[#8E8E93] text-sm font-medium'>{userData.fullName}</p>
                    </div>
                    <div className='flex flex-col items-start gap-1'>
                        <p className='text-[#344054] text-sm font-medium'>Email</p>
                        <p className='text-[#8E8E93] text-sm font-medium'>{userData.email}</p>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex flex-col items-start gap-1'>
                            <p className='text-[#344054] text-sm font-medium'>Current Plan</p>
                            <p className='text-[#8E8E93] text-sm font-medium'>{userData.plan}</p>
                        </div>
                        <div onClick={()=> {navigate('/pricing')}}>
                            <p className='text-[#3C82F6] text-sm font-medium cursor-pointer'>Change</p>
                        </div>
                    </div>
                </div>

                {/* change password card  */}
                {!userData.via_google && 
                    <div className='flex flex-col gap-5 shadow-md p-5 pb-8'>
                        <p className='font-semibold text-black text-3xl'>Change password</p>

                        {errorMessage && (
                            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                                <strong className='font-bold'>Error: </strong>
                                <span className='block sm:inline'>{errorMessage}</span>
                            </div>
                        )}

                        {successMessage && (
                            <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' role='alert'>
                                <strong className='font-bold'>Success: </strong>
                                <span className='block sm:inline'>{successMessage}</span>
                            </div>
                        )}

                        <form onSubmit={handleChangePassword}>
                            
                            <div className='mt-4'>
                                <label htmlFor='currentPassword' className='mb-2 text-xs font-medium text-black'>
                                    Current Password <span className='text-[#EC5252]'>*</span>
                                </label>
                                <input
                                    onFocus={() => setBlurEmail(true)}
                                    onBlur={() => setBlurEmail(false)}
                                    type='password'
                                    name='currentPassword'
                                    id='currentPassword'
                                    className={`border ${blurEmail ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurEmail ? 'text-[#3C82F6]' : 'text-black'} focus:outline-none rounded-lg w-full h-11 p-3`}
                                    placeholder='Enter your current password'
                                    required
                                    minLength={8}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div className='mt-2'>
                                <label htmlFor='newPassword' className='mb-2 text-xs font-medium text-black'>
                                    New Password <span className='text-[#EC5252]'>*</span>
                                </label>
                                <input
                                    onFocus={() => setBlurPassword(true)}
                                    onBlur={() => setBlurPassword(false)}
                                    type='password'
                                    name='newPassword'
                                    id='newPassword'
                                    className={`border ${blurPassword ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurPassword ? 'text-[#3C82F6]' : 'text-black'} focus:outline-none rounded-lg w-full h-11 p-3`}
                                    placeholder='Create a new password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={8}
                                />
                                <p className='text-[#475467] font-normal text-sm pt-1'>Must be at least 8 characters.</p>
                            </div>

                            <div className='mt-2'>
                                <label htmlFor='confirmPassword' className='mb-2 text-xs font-medium text-black'>
                                    Confirm Password <span className='text-[#EC5252]'>*</span>
                                </label>
                                <input
                                    onFocus={() => setBlurConfirmPassword(true)}
                                    onBlur={() => setBlurConfirmPassword(false)}
                                    type='password'
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    className={`border ${blurConfirmPassword ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurConfirmPassword ? 'text-[#3C82F6]' : 'text-black'} focus:outline-none rounded-lg w-full h-11 p-3`}
                                    placeholder='Enter password to confirm'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={8}
                                />
                            </div>

                            <button
                                type='submit'
                                className='bg-[#3C82F6] text-white rounded-lg h-11 px-5 mt-4'
                            >
                                Change Password
                            </button>

                        </form>
                    </div>
                }
            </div>
        </div>
    );
};

export default Settings;
