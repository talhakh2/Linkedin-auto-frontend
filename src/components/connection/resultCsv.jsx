import React from 'react'
import CSV from '../../Assets/CSV.png'
const ResultCsv = ({setShowComponent, users, uploadedFileName}) => {

  return (
        <div className='px-10 flex flex-col gap-4'>
          <p className='font-bold text-lg text-[#1F384C]'>Create Campaigns</p>
          <div className='flex flex-col gap-2 pt-5'>
            <div
              className='border-2 border-dashed border-[#D0D0D0] rounded-lg py-7'
            >
              <div className='flex flex-col gap-3 items-center justify-center'>
                    <img src={CSV} alt="Upload" />
                  <p className='text-[#1F384C] font-normal text-2xl'>{uploadedFileName}</p>
              </div>
            </div>
          </div>


        {/* Results  */}
        <div className='flex flex-col gap-4'>
              <p className=' font-medium text-base text-black'>Results</p>
              <div className=' shadow-sm w-full h-14 flex items-center border border-gray-100  text-center  px-5'>
                <p className='font-medium text-base text-start w-[20%] text-black'>Name</p>
                <p className='font-medium text-base  text-black'>Headline</p>
              </div>
             {
                users.map((person,index)=>{
                    return(
                        <div key={index} className=' shadow-sm w-full h-14 flex items-center border border-gray-100 text-center px-5'>
                        <p className='font-normal text-start text-sm w-[20%]  text-[#8E8E93]'>{person.name}</p>
                        <p className='font-normal text-sm text-[#8E8E93] '>{person.headline}</p>
                    </div>

                    )
                })
             }
              
            </div>
            <div className='w-full flex items-end justify-end'>
            <button className='bg-[#3C82F6] text-white w-28 h-10 rounded-lg'
            onClick={()=>{
                 setShowComponent("connectionMessage")
            }}>
                 Next
           </button>

        </div>
        </div>
      
  )
}

export default ResultCsv
