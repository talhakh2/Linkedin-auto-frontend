import React, { useEffect, useState } from 'react';
import pricingData from '../../lib/data';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../store/features/AuthenticationSlice';

const Pricing = () => {
  const userId = useSelector(state => state.authentication._id);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { plan, email, fullName } = userData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const { data } = await axios.get(`${apiUrl}/api/v1/users/current-user`, { withCredentials: true });
        console.log("data: ", data);
        setUserData(data.data);
      } catch (error) {
        console.error('Error fetching the current user:', error);
        dispatch(removeUser());
      }
    };

    fetchData();
  }, [userId]);

  const handleClick = async (title, priceId, index) => {
    try {
      if (title === 'Starter') {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/checkout/Starter?userId=${userId}`
        );
        navigate('/settings')
      } else if (title === 'Enterprise') {
        await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/checkout/Enterprise?userId=${userId}&email=${email}&fullName=${fullName}`
        );
        alert("Request sent for custom plan");
      } else {

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/checkout/Pro?userId=${userId}&priceId=${priceId}&plan=${title}`
        );
        window.open(data.session.url);
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
    }
  };

  return (
    <div className='relative p-10'>
      <div className='absolute top-5 left-5'>
        <FaArrowLeft
          size={24}
          className='cursor-pointer text-gray-700 hover:text-gray-900'
          onClick={() => navigate('/')}
        />
      </div>

      <div className='flex flex-col items-center justify-center py-10 px-28 gap-5'>
        <p className='font-semibold text-4xl'>Pricing</p>
        <p className='font-medium text-2xl text-center'>
          Unlock premium features to supercharge your LinkedIn outreach. Choose the plan that fits your needs and start transforming your networking strategy today!
        </p>
      </div>

      <div className='flex items-center justify-center gap-10'>
        {pricingData.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg border shadow-lg p-5 w-72 flex flex-col gap-7 ${index === 3 && "bg-[#3C82F6] text-white"}`}
          >
            <div className='flex flex-col items-start gap-3'>
              <p className='text-base font-semibold'>{item.title}</p>
              <p className='text-3xl font-semibold'>
                {item.fee} <span className='font-medium text-base'>{index > 0 && index < 3 && "/ month"}</span>
              </p>
              <button
                className={`rounded-lg shadow-md h-11 w-full p-2 
    ${index === 1 ? "bg-[#3C82F6] text-white" : "bg-white text-black"} 
    ${plan?.toLowerCase() === item.title.toLowerCase() ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handleClick(item.title, item.priceId, index)}
                disabled={plan?.toLowerCase() === item.title.toLowerCase()}
                // disabled={plan?.toLowerCase() === item.title.toLowerCase() || ((plan === "Pro" ||  plan === "Premier") && item.title === "Starter")}
              >
                {item.txt}
              </button>

            </div>
            <div className='flex flex-col gap-3'>
              <p className='font-normal text-base'>{item.featuretxt}</p>
              {item.options.map((features, idx) => (
                <div key={idx} className='flex items-center gap-3'>
                  <FaCheckCircle size={20} className={`${index === 3 ? "text-white" : "text-[#3C82F6]"}`} />
                  <p className='text-lg font-normal'>{features}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
