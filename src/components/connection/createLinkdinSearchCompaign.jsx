import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import ResultpageLinkdin from './resultpage';
import { IoIosHelpCircle } from 'react-icons/io';
import ConnectionMessage from './connectionMessage';
import CompaignsDashboard from '../compaignsDashboard';
import axios from 'axios';

const CreateLinkdinSearchCompaign = ({setActiveCampaign, setConnectionCompaignType}) => {

  const userId = useSelector(state => state.authentication._id);

    const [blurEmail, setBlurEmail] = useState(false);
    const [blurUrl, setBlurUrl] = useState(false);
    const [showComponent, setShowComponent] = useState("newConnectionCompaign");

    // State to hold campaign data
    const [campaignData, setCampaignData] = useState({
        userId,
        name: '',
        createdOn: new Date().toLocaleDateString(),
        users: [],
        Connection_Request_Message: '',
        Follow_up_Message: '',
        dm_time: 0,
        isToggled: false
    });

    // Function to handle updating the campaign data
    const updateCampaignData = (field, value) => {
        setCampaignData((prevData) => {
            const updatedData = { ...prevData, [field]: value };
            console.log("Updated Campaign Data:", updatedData); // Log the updated object
            return updatedData;
        });
    };

    const handleSubmit = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post( `${apiUrl}/api/v1/campaign/save-campaign`, campaignData);
            setActiveCampaign('');
            setConnectionCompaignType('');
            console.log('Campaign saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving campaign:', error);
        }
    };

    return (
        <div className='flex-1 transition-margin duration-300 md:ml-[16%] p-4 bg-white'>
            {
                showComponent === "newConnectionCompaign" && (
                    <div className='px-10 flex flex-col gap-5'>
                        <p className='font-bold text-lg text-[#1F384C]'>Create Campaigns</p>

                        {/* Campaign Name Input */}
                        <div className='flex flex-col items-start gap-2 pt-5'>
                            <label htmlFor="text" className="text-base font-normal text-black">
                                Campaign Name
                            </label>
                            <input
                                onFocus={() => setBlurEmail(true)}
                                onBlur={() => setBlurEmail(false)}
                                type="text"
                                name="campaignName"
                                id="name"
                                onChange={(e) => updateCampaignData('name', e.target.value)}
                                className={`border ${blurEmail ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurEmail ? "text-[#3C82F6]" : "text-black"} focus:outline-none rounded-lg w-full h-16 p-3`}
                                placeholder="Enter Campaign name"
                                required
                            />
                        </div>

                        {/* LinkedIn Search URL Input */}
                        <div className='flex flex-col items-start gap-2'>
                            <label htmlFor="text" className="text-base font-normal text-black flex items-center gap-1">
                                LinkedIn Search URL <IoIosHelpCircle className='text-[#3C82F6]' />
                            </label>
                            <input
                                onFocus={() => setBlurUrl(true)}
                                onBlur={() => setBlurUrl(false)}
                                type="text"
                                name="linkedinUrl"
                                id="url"
                                onChange={(e) => updateCampaignData('searchUrl', e.target.value)}
                                className={`border ${blurUrl ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurUrl ? "text-[#3C82F6]" : "text-black"} focus:outline-none rounded-lg w-full h-16 p-3`}
                                placeholder="Enter LinkedIn Search URL"
                                required
                            />
                        </div>

                        {/* Search Button */}
                        <button
                            className='bg-[#3C82F6] text-white w-28 h-10 rounded-lg'
                            onClick={() => {
                                setShowComponent("result");
                            }}
                        >
                            Search
                        </button>
                    </div>
                )
            }

            {/* Display Results */}
            {
                showComponent === "result" && (
                    <ResultpageLinkdin
                        setShowComponent={setShowComponent}
                        searchUrl={campaignData.searchUrl}
                        updateCampaignData={updateCampaignData}
                    />
                )
            }

            {/* Connection Message Component */}
            {
                showComponent === "connectionMessage" && (
                    <ConnectionMessage
                        setShowComponent={setShowComponent}
                        updateCampaignData={updateCampaignData}
                        handleSubmit={handleSubmit}
                    />
                )
            }

            {/* Submit Button */}
            {
                showComponent === "compaignStats" && (
                    <div>
                        <CompaignsDashboard />
                    </div>
                )
            }
        </div>
    );
}

export default CreateLinkdinSearchCompaign;
