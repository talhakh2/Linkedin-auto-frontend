import React, { useState } from 'react';
import axios from 'axios';
import { FaLink } from 'react-icons/fa';
import send from '../Assets/Send.png';
import contact from '../Assets/Contact.png'
import accepted from '../Assets/accepted.png'
import replied from '../Assets/replied.png'
import { AiOutlineCheck } from 'react-icons/ai'; // Icon for the save tick

const apiUrl = process.env.REACT_APP_API_URL;

const CommentCompaignsDashboard = ({ commentCampaignData, setCommentCampaignData, campaignName }) => {
    const textLimit = 100;
    const titleLimit = 40;
    const commentLimit = 50;

    const [expandedTitles, setExpandedTitles] = useState({});
    const [expandedContents, setExpandedContents] = useState({});
    const [expandedComments, setExpandedComments] = useState({});

    const [editingComment, setEditingComment] = useState(null);
    const [newComment, setNewComment] = useState('');

    const truncateText = (text, limit) => {
        return text?.length > limit ? text.slice(0, limit) + '...' : text;
    };

    const toggleExpandTitle = (index) => {
        setExpandedTitles(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const toggleExpandContent = (index) => {
        setExpandedContents(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const toggleExpandComment = (index) => {
        setExpandedComments(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleEditComment = (index, currentComment) => {
        setEditingComment(index);
        setNewComment(currentComment); // Initialize with the current comment
    };

    const handleActionChange = async (index, newAction) => {
        try {
            const postId = commentCampaignData.posts[index]._id;
            const campaignId = commentCampaignData._id;

            const response = await axios.put(`${apiUrl}/api/v1/campaign/updateCommentCampaignStatus/${campaignId}/posts/${postId}`, {
                action: newAction,
            });

            if (response.status === 200) {
                setCommentCampaignData(response.data);
                console.log("Updated");
            }
        } catch (error) {
            console.error('Error updating action status:', error);
        }
    };

    const handleSaveComment = async (postId) => {
        try {
            const campaignId = commentCampaignData._id;

            const response = await axios.put(`${apiUrl}/api/v1/campaign/updateCommentCampaignComment/${campaignId}/posts/${postId}`, {
                comment: newComment
            });

            if (response.status === 200) {
                setCommentCampaignData(response.data);
                setEditingComment(null); // Close editing state
                setNewComment(''); // Clear the comment input
                console.log("Comment updated");
            }
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <div className='px-4 md:px-10 flex flex-col gap-8 pb-5'>
            <div className='flex items-center justify-between'>
                <p className='font-bold text-lg text-[#1F384C]'>{campaignName}</p>
            </div>
            <div className='grid grid-cols-3 gap-8'>

                <div className='bg-[#F1F2F7] rounded-lg flex items-start justify-between p-5 h-44'>
                    <div>
                        <p className='text-[#8E8E93] text-xl font-medium'>Total Contacted</p>
                        <p className='text-4xl font-medium'>20/30</p>
                    </div>
                    <div className='bg-[#3C82F6] rounded-full h-[60px] w-[60px] flex items-center justify-center'>
                        <img src={contact} alt="" />
                    </div>
                </div>

                <div className='bg-[#F1F2F7] rounded-lg flex items-start justify-between p-5 h-44'>
                    <div>
                        <p className='text-[#8E8E93] text-xl font-medium'>Total Replied</p>
                        <p className='text-4xl font-medium'>20/30</p>
                    </div>
                    <div className='bg-[#3C82F6] rounded-full h-[60px] w-[60px] flex items-center justify-center'>
                        <img src={replied} alt="" />
                    </div>
                </div>

                <div className='bg-[#F1F2F7] rounded-lg flex items-start justify-between p-5 h-44'>
                    <div>
                        <p className='text-[#8E8E93] text-xl font-medium'>Total Accepted</p>
                        <p className='text-4xl font-medium'>20/30</p>
                    </div>
                    <div className='bg-[#3C82F6] rounded-full h-[60px] w-[60px] flex items-center justify-center'>
                        <img src={accepted} alt="" />
                    </div>
                </div>

                <div className='bg-[#F1F2F7] rounded-lg flex items-start justify-between p-5 h-44'>
                    <div>
                        <p className='text-[#8E8E93] text-xl font-medium'>Total Followed-up</p>
                        <p className='text-4xl font-medium'>20/30</p>
                    </div>
                    <div className='bg-[#3C82F6] rounded-full h-[60px] w-[60px] flex items-center justify-center'>
                        <img src={send} alt="" />
                    </div>
                </div>


            </div>



            <div className='flex flex-col gap-4'>
                <p className='font-medium text-base text-black'>Posts</p>

                <div className='shadow-sm w-full h-14 flex items-center border border-gray-100 text-center px-3 md:px-5'>
                    <p className='font-medium text-base text-center w-[15%] text-black'>Name</p>
                    <p className='font-medium text-base text-center w-[15%] text-black'>Title</p>
                    <p className='font-medium text-base text-start w-[10%] text-black'>Link</p>
                    <p className='font-medium text-base text-center w-[20%] text-black'>Content</p>
                    <p className='font-medium text-base text-center w-[12.5%] text-black'>Comment</p>
                    <p className='font-medium text-base text-center w-[12.5%] text-black'>Action</p>
                    <p className='font-medium text-base text-center w-[12.5%] text-black'>Status</p>
                </div>

                {commentCampaignData.posts.map((post, index) => (
                    <div key={index} className='shadow-sm w-full h-auto min-h-14 gap-2 flex items-center border border-gray-100 text-start px-3 md:px-5 relative'>
                        <p className='font-normal text-start text-sm w-[15%] text-[#8E8E93]'>{post?.name}</p>

                        <div className='w-[15%] text-start'>
                            <p className='font-normal text-sm text-[#8E8E93]'>
                                {expandedTitles[index] ? post?.headline : truncateText(post?.headline, titleLimit)}
                            </p>
                            {post?.headline?.length > titleLimit && (
                                <button
                                    className='text-[#3C82F6] text-xs font-normal'
                                    onClick={() => toggleExpandTitle(index)}>
                                    {expandedTitles[index] ? 'Hide' : 'View'}
                                </button>
                            )}
                        </div>

                        <div className='w-[10%] text-start'>
                            <a
                                href={post?.share_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-[#3C82F6]'
                            >
                                <FaLink />
                            </a>
                        </div>

                        <div className='w-[20%] text-start'>
                            <p className='font-normal text-sm text-[#8E8E93]'>
                                {expandedContents[index] ? post?.text : truncateText(post?.text, textLimit)}
                            </p>
                            {post?.text?.length > textLimit && (
                                <button
                                    className='text-[#3C82F6] text-xs font-normal'
                                    onClick={() => toggleExpandContent(index)}>
                                    {expandedContents[index] ? 'Hide' : 'View'}
                                </button>
                            )}
                        </div>

                        <div className='w-[12.5%] text-start relative'>
                            {editingComment === index ? (
                                <div className='relative'>
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className='border p-1 rounded-md w-full resize-none' // Remove fixed height
                                        rows={3} // Start with 1 row
                                        style={{ overflow: 'hidden' }} // Hide scrollbar
                                    />
                                    <button
                                        className='absolute top-1 right-1 text-green-500'
                                        onClick={() => handleSaveComment(post._id)} // Correctly wrap the call
                                    >
                                        <AiOutlineCheck size={18} />
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div onClick={() => handleEditComment(index, post?.comment)}>
                                        <p className='font-normal text-sm text-[#8E8E93] cursor-pointer'>
                                            {expandedComments[index] ? post?.comment : truncateText(post?.comment, commentLimit)}
                                        </p>
                                    </div>
                                    {post?.comment?.length > commentLimit && (
                                        <button
                                            className='text-[#3C82F6] text-xs font-normal'
                                            onClick={() => toggleExpandComment(index)}>
                                            {expandedComments[index] ? 'Hide' : 'View'}
                                        </button>
                                    )}
                                </div>

                            )}
                        </div>

                        <div className='w-[12.5%] text-start'>
                            <select
                                value={post.action}
                                onChange={(e) => handleActionChange(index, e.target.value)}
                                className='border rounded-md p-1'
                            >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                            </select>
                        </div>

                        <p className='font-normal text-sm text-[#8E8E93] w-[12.5%] text-start'>{post?.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentCompaignsDashboard;
