import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import Compaigns from './compaigns'

const Main = () => {
  return (
    <div className={`flex-1 transition-margin duration-300 md:ml-[16%] p-4 bg-white`}>
        <div className='p-10'>
            {/* Search box */}
            <div className='bg-[#F6F6FB] w-[50%] h-10 rounded-lg flex items-center justify-between'>
                <input type="text" placeholder='Search' className=' outline-none bg-transparent p-2 ml-3 w-[80%]' />
                <button className='mr-4'>
                <IoSearchOutline className='text-[#627B87]' />
                </button>
            </div>

            {/* compaigns */}
            <p className=' font-bold text-lg pt-5 text-[#1F384C]'></p>
            <Compaigns/>
        </div>
      
    </div>
  )
}

export default Main
