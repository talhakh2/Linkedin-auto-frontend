import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosHelpCircle } from 'react-icons/io';
import { FaLink } from 'react-icons/fa';

const CommentingResult = ({ setShowComonent, searchUrl, updateCampaignData }) => {
    const [blurUrl, setBlurUrl] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data based on LinkedIn Search URL
    useEffect(() => {
        if (!searchUrl) return;

        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const response = await axios.post('https://linkedinapi-production-1eda.up.railway.app/search-posts', {
                    account_id: 'HuHnWG2vSwicMoYZhVNTvg', // Replace with actual account_id
                    search_url: searchUrl,
                });

                if (response.status !== 200) {
                    throw new Error('Failed to fetch data');
                }

                const results = response.data.map(item => ({
                    name: item.author.name,
                    headline: item.author.headline,
                    id: item.social_id, // post id
                    text: item.text,
                    share_url: item.share_url,
                }));

                updateCampaignData('posts', results);
                setSearchResults(results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='px-10 flex flex-col gap-5'>
            <p className='font-bold text-lg text-[#1F384C]'>Create Campaigns</p>

            {/* LinkedIn Search URL Input */}
            <div className='flex flex-col items-start gap-2'>
                <label htmlFor="text" className="text-base font-normal text-black flex items-center gap-1">
                    LinkedIn Search URL <IoIosHelpCircle className='text-[#3C82F6]' />
                </label>
                <input
                    onFocus={() => setBlurUrl(true)}
                    onBlur={() => setBlurUrl(false)}
                    type="text"
                    name="linkdinUrl"
                    id="url"
                    className={`border ${blurUrl ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurUrl ? 'text-[#3C82F6]' : 'text-black'} focus:outline-none rounded-lg w-full h-16 p-3`}
                    placeholder={searchUrl}
                    required
                />
            </div>

            {/* Results Table */}
            <div className='flex flex-col gap-4'>
                <p className='font-medium text-base text-black'>Results</p>
                <div className='hidden md:grid grid-cols-4 gap-2 p-4 bg-gray-50'>
                    <span className='font-medium text-black'>Name</span>
                    <span className='font-medium text-black'>Headline</span>
                    <span className='font-medium text-black'>Post Content</span>
                    <span className='font-medium text-black'>Post URL</span>
                </div>

                {/* Map through the results and render ResultRow for each */}
                {searchResults.map((person, index) => (
                    <ResultRow key={index} person={person} />
                ))}
            </div>

            <div className='w-full flex items-end justify-end'>
                <button
                    className='bg-[#3C82F6] text-white w-28 h-10 rounded-lg'
                    onClick={() => setShowComonent('commentSettings')}>
                    Next
                </button>
            </div>
        </div>
    );
};

// Reusable Component for Result Row
const ResultRow = ({ person }) => {
    const [isExpandedText, setIsExpandedText] = useState(false);
    const [isExpandedTitle, setIsExpandedTitle] = useState(false);
    const [showViewButton, setShowViewButton] = useState(false);
    const [showViewTitleButton, setShowViewTitleButton] = useState(false);
    const textLimit = 100; // Adjust the limit as per your design
    const titleLimit = 50; // Adjust the title limit as per your design

    useEffect(() => {
        // Check if the text length exceeds the limit, then show "View" button
        if (person?.text?.length > textLimit) {
            setShowViewButton(true);
        } else {
            setShowViewButton(false);
        }

        // Check if the title length exceeds the limit, then show "View" button
        if (person?.headline?.length > titleLimit) {
            setShowViewTitleButton(true);
        } else {
            setShowViewTitleButton(false);
        }
    }, [person.text, person.name]);

    const truncateText = (text, limit) => {
        return text?.length > limit ? text.slice(0, limit) + '...' : text;
    };

    return (
        <div className='md:grid grid-cols-4 gap-2 p-4 border-b border-gray-100 flex flex-col md:flex-none'>
            {/* Name */}
            <p className='font-normal text-sm text-[#8E8E93]'>{person.name}</p>
            {/* Title with conditional "View" Button */}
            <div className='flex flex-col gap-1'>
                <p className='text-sm text-[#8E8E93]'>
                    {isExpandedTitle ? person?.headline : truncateText(person?.headline, titleLimit)}
                </p>
                {showViewTitleButton && (
                    <button
                        className='text-[#3C82F6] text-xs font-medium'
                        onClick={() => setIsExpandedTitle(prev => !prev)}>
                        {isExpandedTitle ? 'Hide' : 'View'}
                    </button>
                )}
            </div>

            {/* Post Content with conditional "View" Button */}
            <div className='flex flex-col gap-1'>
                <p className='text-sm text-[#8E8E93]'>
                    {isExpandedText ? person.text : truncateText(person.text, textLimit)}
                </p>
                {showViewButton && (
                    <button
                        className='text-[#3C82F6] text-xs font-medium'
                        onClick={() => setIsExpandedText(prev => !prev)}>
                        {isExpandedText ? 'Hide' : 'View'}
                    </button>
                )}
            </div>

            {/* Clickable Truncated URL */}
            <div className='w-[10%]'>
                <a
                    href={person?.share_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-[#3C82F6]'
                >
                    <FaLink />
                </a>
            </div>
        </div>
    );
};


export default CommentingResult;
