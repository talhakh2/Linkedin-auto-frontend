import React from 'react'
import { FiSearch } from 'react-icons/fi'

const CommentingCompaign = ({setCommentingCompaignType,setActiveCampaign}) => {
  return (
    <div className='flex-1 transition-margin duration-300 md:ml-[16%] p-4 bg-white'>
        <div className='p-10'>
            <div>
                <p className='text-[#1F384C] font-bold text-lg'>Start a new connection request campaign</p>
                <p className='text-[#8E8E93] text-base font-medium'>Import Contacts from the options and Start Connecting</p>
            </div>


     <div className='text-[#1F384C] pt-5'>
          <div className='w-full h-20 flex items-center justify-between bg-[#F1F2F7] rounded-lg px-5 cursor-pointer'
          onClick={()=>{
            setCommentingCompaignType('linkdin')
            setActiveCampaign("")
          }}>
            <div className='flex flex-col items-start'>
               
            <div className='flex flex-col items-start'>
            <div className='flex items-center gap-4'>
            <FiSearch className='text-black' size={20}/>
              <p className='text-base font-bold'>
                LinkedIn Search
              </p>
              </div>
              <p className='text-[#8E8E93] text-sm font-normal pl-9'>Search for people on LinkedIn using filters (e.g., location, job title), then paste the search page URL here.</p>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default CommentingCompaign
