import React from 'react';

const CompaignDropdown = ({setActiveCampaign,dropdownRef}) => {
    return (
        <div ref={dropdownRef} className="absolute bg-white shadow-lg rounded-lg border border-gray-200 mt-2 right-[5%] w-40 top-12 p-2">
            <button className="w-full text-left px-4 py-2 text-xs font-medium text-black hover:bg-gray-100 rounded-lg"
            onClick={()=>{
                setActiveCampaign("connection")
            }}>
              Connection Request
            </button>
            <button className="w-full text-left px-4 py-2 text-xs font-medium text-black hover:bg-gray-100 rounded-lg mt-1"
             onClick={()=>{
                setActiveCampaign("commenting")
            }}>
              Commenting
            </button>
        </div>
    );
}

export default CompaignDropdown;
