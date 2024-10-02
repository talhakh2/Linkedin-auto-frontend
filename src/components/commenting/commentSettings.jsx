import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = process.env.REACT_APP_OPENAI_KEY;

const CommentSettings = ({ setShowComonent, updateCampaignData, handleSubmit  }) => {
  const navigate = useNavigate();
  const [emojis, setEmojis] = useState(false);
  const [hashtags, setHashtags] = useState(false);
  const [exclamation, setExclamation] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [commentPreview, setCommentPreview] = useState(''); // For storing the generated comment
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle generating a comment
  const generateComment = async () => {
    setLoading(true);
    setError(null);
    console.log(api);
    try {
      // Prepare the prompt based on selected options
      let prompt = 'Generate a general comment for a linkedin post (mmake it too general as it will be fit for all kind of posts)';
      if (emojis) prompt += ' with emojis';
      if (hashtags) prompt += ' and hashtags';
      if (exclamation) prompt += ' with exclamation marks';
      if (lowercase) prompt += ' in lowercase';
      prompt += `. Don’t include quotation marks at the start or end. only generate comment, not any other sentence. only include the mentioned things nothing else.`
  
      // Make API call to OpenAI using the chat/completions endpoint
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo', // Specify the correct model for chat completions
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' }, // Initial system message to guide the assistant's behavior
          { role: 'user', content: prompt } // User's input (prompt)
        ],
        max_tokens: 50,
        temperature: 0.7,
      }, {
        headers: {
          Authorization: `Bearer ${api}`,
        },
      });
  
      // Extract generated comment from response
      const generatedComment = response.data.choices[0].message.content.trim();
  
      // Update the preview and campaign data
      setCommentPreview(generatedComment);
      updateCampaignData('posts', generatedComment); // Assuming updateCampaignData accepts 'generatedComment' as a key
  
    } catch (err) {
      console.log(err);
      setError('Failed to generate comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Automatically generate comment on initial load
  useEffect(() => {
    generateComment();
  }, []);

  // Re-generate comment when any checkbox changes
  useEffect(() => {
    generateComment();
  }, [emojis, hashtags, exclamation, lowercase]);

  // Handle comment input modification by the user
  const handleCommentChange = (e) => {
    const updatedComment = e.target.value;
    setCommentPreview(updatedComment);
    updateCampaignData('posts', updatedComment);
  };

  return (
    <div className='px-10 flex flex-col gap-8'>
      <p className='font-bold text-lg text-[#1F384C]'>Settings</p>

      {/* Settings */}
      <div className='flex flex-col gap-5'>
        <div className='shadow-sm w-full h-14 flex items-center justify-between border border-gray-100 px-5'>
          <p className='font-normal text-base text-[#2B2D42]'>Turn on emojis</p>
          <input type="checkbox" className='h-4 w-4' checked={emojis} onChange={() => setEmojis(!emojis)} />
        </div>
        <div className='shadow-sm w-full h-14 flex items-center justify-between border border-gray-100 px-5'>
          <p className='font-normal text-base text-[#2B2D42]'>Turn on hashtags</p>
          <input type="checkbox" className='h-4 w-4' checked={hashtags} onChange={() => setHashtags(!hashtags)} />
        </div>
        <div className='shadow-sm w-full h-14 flex items-center justify-between border border-gray-100 px-5'>
          <p className='font-normal text-base text-[#2B2D42]'>Turn on exclamation</p>
          <input type="checkbox" className='h-4 w-4' checked={exclamation} onChange={() => setExclamation(!exclamation)} />
        </div>
        <div className='shadow-sm w-full h-14 flex items-center justify-between border border-gray-100 px-5'>
          <p className='font-normal text-base text-[#2B2D42]'>Write in lowercase</p>
          <input type="checkbox" className='h-4 w-4' checked={lowercase} onChange={() => setLowercase(!lowercase)} />
        </div>
      </div>

      {/* Comment Preview */}
      <div>
        <p className='font-medium text-base text-[#1F384C]'>Comment Preview</p>
        <div className='border border-[#D0D0D0] w-full h-44 rounded-lg mt-5'>
          <textarea
            placeholder='Comment based on selected style'
            className='w-full h-full resize-none p-3 bg-transparent outline-none'
            rows={5}
            value={commentPreview}
            onChange={handleCommentChange}
          />
        </div>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>

      {/* Save and Finish Button */}
      <div className='w-full flex items-end justify-end gap-3'>
        <button
          className='bg-[#3C82F6] text-white w-32 h-10 rounded-lg'
          onClick={() => {
            
            navigate('/dashboard')
            handleSubmit()
          }}
        >
          Save and Finish
        </button>
      </div>
    </div>
  );
};

export default CommentSettings;
