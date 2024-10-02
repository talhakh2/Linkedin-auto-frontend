import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/features/AuthenticationSlice';

const Sidebar = ({ isActive, setIsActive, setActiveCampaign, setConnectionCampaignType, setIsShow, setCommentingCampaignType }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            await axios.post(`${apiUrl}/api/v1/users/logout`, {}, { withCredentials: true });
            dispatch(removeUser());
            navigate('/login');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    const handleDasboard = () => {
        setIsActive(true);
        setActiveCampaign('');
        setConnectionCampaignType(''); // Correct function name
        setCommentingCampaignType(''); // Correct function name
        setIsShow(true);
    }

    return (
        <aside className="bg-[#F1F2F7] w-64 h-screen fixed top-0 left-0 md:block hidden">
            <nav className="flex flex-col p-4 pt-10">
                <div className='w-full flex flex-col items-center justify-center gap-2 px-10'>
                    <p className='font-medium text-sm'>LinkedIn Account</p>
                    <button className='bg-[#3C82F6] rounded-lg h-10 text-white font-bold w-full'>Connect</button>
                </div>
                <div className='pt-5'>
                    <p className='text-[#082431] font-normal text-xs'>MENU</p>
                    <div className='pt-2'>
                        <Link to="/dashboard" className={`flex items-center p-2 hover:text-[#3C82F6] ${isActive ? 'bg-[#3C82F6] text-[#3C82F6] bg-opacity-10' : ''} rounded-lg`}
                            onClick={handleDasboard}>
                            <AiOutlineHome size={24} className="mr-3" />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/settings" className={`flex items-center p-2 ${!isActive ? 'bg-[#3C82F6] text-[#3C82F6] bg-opacity-10' : ''} hover:text-[#3C82F6] rounded-lg mt-2`}
                            onClick={() => {
                                setIsActive(false);
                            }}>
                            <AiOutlineSetting size={24} className="mr-3" />
                            <span>Settings</span>
                        </Link>
                        <Link to="/login" className="flex items-center p-2 hover:text-[#3C82F6] rounded-lg mt-2"
                            onClick={handleLogout}>
                            <FiLogOut size={24} className="mr-3" />
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
