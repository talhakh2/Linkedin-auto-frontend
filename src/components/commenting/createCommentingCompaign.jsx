import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoIosHelpCircle } from 'react-icons/io';
import CommentingResult from './commentingResult';
import CommentSettings from './commentSettings';
import axios from 'axios';

const CreateCommentingCompaign = ({setActiveCampaign, setCommentingCompaignType }) => {
    const userId = useSelector(state => state.authentication._id);

    const [blurEmail, setBlurEmail] = useState(false);
    const [blurUrl, setBlurUrl] = useState(false);
    const [showComponent, setShowComonent] = useState("newCommenting")

    // State to hold campaign data
    const [campaignData, setCampaignData] = useState({
        userId,
        name: '',
        createdOn: new Date().toLocaleDateString(),
        posts: [],
        isToggled: false
    });

    // Function to handle updating the campaign data
    // const updateCampaignData = (field, value) => {
    //     setCampaignData((prevData) => {
    //         const updatedData = { ...prevData, [field]: value };
    //         console.log("Updated Campaign Data:", updatedData); // Log the updated object
    //         return updatedData;
    //     });
    // };

    const updateCampaignData = (field, value) => {
        setCampaignData((prevData) => {
            const updatedData = { ...prevData };
    
            // Initialize posts if this is the first time setting them
            if (field === 'posts' && value && Array.isArray(value)) {
                updatedData.posts = value; // Store fetched posts
            } 
            // Check if the field is 'posts' and value is the comment to update
            else if (field === 'posts' && value && Array.isArray(updatedData.posts)) {
                updatedData.posts = updatedData.posts.map(post => ({
                    ...post,
                    comment: value // Update the comment field for each post
                }));
            } else {
                updatedData[field] = value; // Update other fields normally
            }
    
            console.log("Updated Campaign Data:", updatedData); // Log the updated object
            return updatedData;
        });
    };

    const handleSubmit = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}/api/v1/campaign/save-campaign`, campaignData);
            setActiveCampaign('');
            setCommentingCompaignType('');
            console.log('Campaign saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving campaign:', error);
        }
    };

    return (
        <div className='flex-1 transition-margin duration-300 md:ml-[16%] p-4 bg-white'>
            {
                showComponent === "newCommenting" && (
                    <div className='px-10 flex flex-col gap-5'>
                        <p className=' font-bold text-lg text-[#1F384C]'>Create Compaigns</p>

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


                        <div className=' flex flex-col items-start gap-2'>
                            <label htmlFor="text" className="text-base font-normal text-black flex items-center gap-1">
                                LinkedIn Search URL <IoIosHelpCircle className='text-[#3C82F6]' />
                            </label>
                            <input
                                onFocus={() => setBlurUrl(true)}
                                onBlur={() => setBlurUrl(false)}
                                type="text"
                                name="linkdinUrl"
                                id="url"
                                onChange={(e) => updateCampaignData('searchUrl', e.target.value)}
                                className={`border ${blurUrl ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurUrl ? "text-[#3C82F6]" : "text-black"} focus:outline-none rounded-lg w-full h-16 p-3`}
                                placeholder="Enter LinkedIn Search URL"
                                required
                            />
                        </div>

                        <button className='bg-[#3C82F6] text-white w-28 h-10 rounded-lg'
                            onClick={() => {
                                // setSearched(true)
                                setShowComonent("commentingResult")
                            }}>
                            Search
                        </button>
                    </div>
                )
            }

            {
                showComponent === "commentingResult" && (
                    <CommentingResult 
                    setShowComonent={setShowComonent}
                    searchUrl={campaignData.searchUrl}
                    updateCampaignData={updateCampaignData}
                    />
                )
            }
            {
                showComponent === "commentSettings" && (
                    <CommentSettings 
                    setShowComonent={setShowComonent}
                    updateCampaignData={updateCampaignData}
                    posts={campaignData.posts}
                    handleSubmit={handleSubmit}
                    />
                )
            }

        </div>
    )
}

export default CreateCommentingCompaign
