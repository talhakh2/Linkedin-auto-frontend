import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    navigate('/verification', { state: { email, action: 'forgot' } });
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      await axios.post(`${apiUrl}/api/v1/users/send-code`, { email, action: 'forgot' }, { withCredentials: true });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to send OTP.');
      } else {
        setError('An error occurred: ' + err.message);
      }
    }
  };

  return (
    <div className="w-full flex gap-4 justify-center items-center min-h-screen bg-[#F1F2F7] px-5">
      <div className="lg:w-[28%] w-full border bg-white flex items-center justify-center gap-2 flex-col border-[#F1F1F1] rounded-[20px] boxShadow md:py-10 py-5 md:px-10 px-5">
        <h2 className="text-lg font-semibold text-[#101828]">Forgot Password</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            {message && <p className="text-green-500 font-bold text-sm mb-2">{message}</p>}
            {error && <p className="text-red-500 font-bold text-sm mb-2">{error}</p>}
            <button type="submit" className="py-3 text-center w-full text-base font-semibold rounded-lg bg-[#3C82F6] text-white transition-all duration-300">
              Send OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
