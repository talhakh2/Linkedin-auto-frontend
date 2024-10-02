import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { IoIosHelpCircle } from 'react-icons/io'

const ResultpageLinkdin = ({setShowComponent, searchUrl, updateCampaignData}) => {
    const [blurUrl, setBlurUrl] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data based on LinkedIn Search URL
    useEffect(() => {
        if (!searchUrl) return;

        // Simulate fetching data
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                console.log('runnig');
                // Assume you have an API endpoint to get results from the LinkedIn search URL
                const response = await axios.post('https://linkedinapi-production-1eda.up.railway.app/search-people', {
                    account_id: 'HuHnWG2vSwicMoYZhVNTvg', // Replace with actual account_id
                    search_url: searchUrl
                  });
                if (response.status !== 200) {
                    throw new Error('Failed to fetch data');
                }

                const results = response.data.items;

                const limitedItems = results.map(item => ({
                    name: item.name,
                    headline: item.headline,
                    public_identifier: item.public_identifier
                }));

                updateCampaignData("users", limitedItems)
                setSearchResults(limitedItems);
                
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
    <div className='px-10 flex flex-col gap-8'>
        <p className=' font-bold text-lg text-[#1F384C]'>Create Compaigns</p>
        <div className=' flex flex-col items-start gap-1'>
            <label htmlFor="text" className="text-base font-normal text-black flex items-center gap-1">
            LinkedIn Search URL <IoIosHelpCircle className='text-[#3C82F6]' />
            </label>
            <input
                onFocus={() => setBlurUrl(true)}
                onBlur={() => setBlurUrl(false)}
                type="text"
                name="linkdinUrl"
                id="url"
                className={`border ${blurUrl ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurUrl ? "text-[#3C82F6]" : "text-black"} focus:outline-none rounded-lg w-full h-16 p-3`}
                placeholder={searchUrl}
                required
            />
            </div>

            {/* Results  */}

            <div className='flex flex-col gap-4'>
              <p className=' font-medium text-base pt-5 text-black'>Results</p>
              <div className=' shadow-sm w-full h-14 flex items-center border border-gray-100  text-center  px-5'>
                <p className='font-medium text-base text-start w-[20%] text-black'>Name</p>
                <p className='font-medium text-base  text-black'>Headline</p>
              </div>
             {
                searchResults.map((person,index)=>{
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

export default ResultpageLinkdin
