import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import { IoIosNotifications } from 'react-icons/io';
import CompaignDropdown from '../ui/compaigndropdown';

const Navbar = ({ setActiveCampaign,isshow }) => {
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="border-b h-16 flex items-center">
            <div className="flex items-center justify-between w-full px-7 md:ml-64 p-2">
                <div className='flex gap-5'>
                    <button className="md:hidden">
                        <AiOutlineMenu size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-[#3C82F6]">LOGO</h1>
                </div>
                <div className='flex items-center justify-center gap-4'>
                {isshow && (
                    <div
                        className="bg-primary text-white rounded-lg flex items-center justify-center p-2 cursor-pointer font-semibold gap-2"
                        onClick={() => setDropdown(!dropdown)}
                    >
                        <p>Create campaign</p>
                        <FiChevronDown />
                    </div>
                    )}

                    {dropdown && isshow && (
                    <CompaignDropdown setActiveCampaign={setActiveCampaign} dropdownRef={dropdownRef} />
                    )}

                
                 
                    {/* <IoIosNotifications size={30} className='text-[#B0C3CC]' /> */}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
