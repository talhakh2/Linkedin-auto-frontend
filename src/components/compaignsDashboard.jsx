import React from 'react'
import send from '../Assets/Send.png';
import contact from '../Assets/Contact.png'
import accepted from '../Assets/accepted.png'
import replied from '../Assets/replied.png'

const CompaignsDashboard = ({ invitedUsers, campaignName }) => {

  return (
    <div className='px-10 flex flex-col gap-8 pb-5'>
      <div className='flex items-center justify-between'>
        <p className='font-bold text-lg text-[#1F384C]'>{campaignName}</p>
      </div>

      {/* stats  */}
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
        <p className=' font-medium text-base text-black'>Users</p>
        <div className=' shadow-sm w-full h-14 flex items-center border border-gray-100  text-center  px-5'>
          <p className='font-medium text-base text-start w-[20%] text-black'>Name</p>
          <p className='font-medium text-base  text-black text-start w-[20%]'>Title</p>
          <p className='font-medium text-base  text-black text-start w-[20%]'>Reply</p>
          <p className='font-medium text-base  text-black text-start w-[20%]'>Status</p>

        </div>
        {
          invitedUsers.users.map((person, index) => {

            return (
              <div key={index} className='shadow-sm w-full h-auto min-h-14 flex flex-wrap items-center border border-gray-100 text-center px-5'>
                <p className='font-normal text-start text-sm w-full md:w-[20%] text-[#8E8E93]'>{person.name}</p>
                <p className='font-normal text-sm text-[#8E8E93] w-full md:w-[20%] text-start'>{person.headline}</p>
                <p className='font-normal text-sm text-[#8E8E93] w-full md:w-[20%] text-start'></p>
                <p className='font-normal text-sm text-[#8E8E93] w-full md:w-[20%] text-start'>{person.status  ? 'Invited' : 'Not invited'}</p>

              </div>
            )
          })
        }


      </div>



    </div>
  )
}

export default CompaignsDashboard
