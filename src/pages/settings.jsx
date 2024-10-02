import React, { useState } from 'react';
import Navbar from '../components/Layout/navbar';
import Sidebar from '../components/Layout/sidebar';
import Settings from '../components/dashboard/settings';

const SettingsPage = () => {
    const [activeCampaign, setActiveCampaign] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [connectionCampaignType, setConnectionCampaignType] = useState(""); 
    const [commentingCampaignType, setCommentingCampaignType] = useState(""); 
    const [isShow, setIsShow] = useState(true);

    return (
        <div className="flex flex-col h-screen">
            <Navbar setActiveCampaign={setActiveCampaign} isShow={isShow} />
            <div className="flex flex-1">
                <Sidebar 
                    isActive={isActive}
                    setIsActive={setIsActive}
                    setActiveCampaign={setActiveCampaign}
                    setConnectionCampaignType={setConnectionCampaignType}
                    setCommentingCampaignType={setCommentingCampaignType}
                    setIsShow={setIsShow}
                />
                <Settings />
            </div>
        </div>
    );
}

export default SettingsPage;
