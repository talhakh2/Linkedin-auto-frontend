import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConnectionMessage = ({ setShowComponent, updateCampaignData, handleSubmit }) => {

  const navigate = useNavigate();
  useEffect(() => {
    const selectElements = document.querySelectorAll('select');

    selectElements.forEach(selectElement => {
      const defaultColor = '#8E8E93';

      const updateSelectColor = (element) => {
        element.style.color = element.value === '' ? defaultColor : '#000000';
      };

      selectElement.style.color = selectElement.value === '' ? defaultColor : '#000000';

      selectElement.addEventListener('change', function () {
        updateSelectColor(this);
      });
    });
  }, []);

  const data = [
    "{first_name}", "{last_name}", "{job_title}", "{company_name}", "Dynamic Placeholder"
  ];

  return (
    <div className='flex flex-col gap-8 px-10'>
      <p className='font-bold text-lg text-[#1F384C]'>Create Campaigns</p>

      {/* Connection Request Message */}
      <div className='bg-[#F1F2F7] grid grid-cols-3 p-5 rounded-lg mt-5'>
        <div className='col-span-1'>
          <p className='font-medium text-base'>Connection Request Message</p>
          <p className='text-xs font-normal text-[#8E8E93]'>
            Enter your personalized message to accompany the connection request, or leave blank for no message.
          </p>
        </div>
        <div className='col-span-2 border border-[#D0D0D0] w-full h-44 rounded-lg bg-white'>
          <textarea
            placeholder='Type your message here'
            className='w-full h-full resize-none p-3 bg-transparent outline-none'
            onChange={(e) => updateCampaignData("Connection_Request_Message", e.target.value)}
            rows={5}
          />
        </div>
      </div>

      {/* Follow-up Message */}
      <div className='bg-[#F1F2F7] grid grid-cols-3 p-5 rounded-lg'>
        <div className='col-span-1'>
          <p className='font-medium text-base'>Follow-up Message</p>
          <p className='text-xs font-normal text-[#8E8E93]'>
            The message sent after the LinkedIn account has connected with you.
          </p>
        </div>

        <div className='col-span-2 space-y-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-[#344054] text-xs font-medium'>When to send message</p>
            <div className="relative inline-block w-full">
              <select
                className="p-2 appearance-none bg-white border border-[#D0D5DD] rounded-lg h-11 w-full leading-tight outline-none"
                onChange={(e) => updateCampaignData("dm_time", e.target.value)} // Update dm_time here
              >
                <option value="" disabled selected hidden>Select</option>
                <option value="2">After 2 days</option>
                <option value="3">After 3 days</option>
                <option value="4">After 4 days</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div className='border border-[#D0D0D0] w-full h-44 rounded-lg bg-white'>
            <textarea
              placeholder='Type your message here'
              className='w-full h-full resize-none p-3 bg-transparent outline-none'
              onChange={(e) => updateCampaignData("Follow_up_Message", e.target.value)} // Update follow-up message
              rows={5}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <p className='text-[#8E8E93] font-normal text-base'>Use the following placeholders to add a personal touch to your message and make it more engaging</p>
        <div className='flex items-center justify-start gap-2 text-center'>
          {
            data.map((item, index) => {
              return (
                <div key={index} className='bg-[#F1F2F7] p-2 rounded-lg h-11 text-base font-normal'>
                  {item}
                </div>
              );
            })
          }
        </div>
      </div>

      <div className='w-full flex items-end justify-end'>
        <button className='bg-[#3C82F6] text-white w-28 h-10 rounded-lg'
          onClick={() => {
            
            navigate('/dashboard')
            handleSubmit();
          }}>
          Show Stats
        </button>
      </div>
    </div>
  );
};

export default ConnectionMessage;
