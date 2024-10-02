import React, { useRef, useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerificationModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const action = location.state?.action;

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleConfirm = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const otpJoined = otp.join('');
    setError('');
    setMessage('')
    try {
      await axios.post(`${apiUrl}/api/v1/users/verify-otp`, { otp: otpJoined }, { withCredentials: true });
      action === 'forgot' ? navigate('/reset-password', { state: { email } }) : verifyAccount();
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to verify OTP.');
      } else {
        setError('An error occurred: ' + err.message);
      }
    }
  };

  const verifyAccount = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      await axios.post(`${apiUrl}/api/v1/users/verify-account`, { email }, { withCredentials: true });
      // setMessage('Account verified')
      navigate('/login')
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to verify.');
      } else {
        setError('An error occurred: ' + err.message);
      }
    }
  };

  const handleResend = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    setError('');
    setMessage('')
    
    try {
      await axios.post(`${apiUrl}/api/v1/users/send-code`, { email }, { withCredentials: true });
      setMessage('OTP sent again')
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to resend OTP.');
      } else {
        setError('An error occurred: ' + err.message);
      }
    }
  };

  if (!email) return null;

  return (
    <div className="w-full flex gap-4 justify-center items-center min-h-screen bg-[#F1F2F7] px-5">
      <div className="lg:w-[28%] w-full border bg-white flex items-center justify-center gap-2 flex-col border-[#F1F1F1] rounded-[20px] boxShadow md:py-10 py-5 md:px-10 px-5">
        <div className="border border-[#EAECF0] h-[48px] w-[48px] shadow rounded-lg flex justify-center items-center">
          <BsQuestionCircle size={20} />
        </div>
        {action === 'forgot' ? (
          <p className="text-[#101828] text-lg font-semibold">Password Reset</p>
        ): <p className="text-[#101828] text-lg font-semibold">Account verification</p>
        }
        
        <p className="text-[#475467] text-sm font-normal">
          We sent verification code to <span className="text-sm font-semibold">{email}</span>, enter the 5-digit code mentioned in the email.
        </p>
        <div className="py-2 space-y-2 w-full">
          <div className="flex flex-row items-center justify-between gap-2 w-full">
            {otp.map((digit, index) => (
              <div key={index} className="w-[50px] h-[42px]">
                <input
                  ref={inputRefs[index]} // Set ref for each input field
                  className="flex flex-col items-center justify-center w-full h-full font-semibold text-base text-center bg-white border-[#E1E1E1] border-2 outline-none rounded-xl focus:border-[#3C82F6]"
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              </div>
            ))}
          </div>
        </div>
        {error && <p className="text-red-500 font-bold text-sm mb-2">{error}</p>}
        {message && <p className="text-green-500 font-bold text-sm mb-2">{message}</p>}

        
        <button
          className="py-3 text-center w-full text-base font-semibold rounded-lg bg-[#3C82F6] text-white transition-all duration-300"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className="py-3 text-center w-full text-base border border-[#D0D5DD] font-semibold rounded-lg text-[#344054] transition-all duration-300"
          onClick={() => navigate('/login')}
        >
          Cancel
        </button>
        <p className="text-primary block py-1 text-[16px] font-medium">
          <span className="text-[#B9BBBB] flex items-center gap-1">
            <div className="font-semibold text-base text-[#989898]">
              Haven’t got the email yet? <span className="text-[#648DDB] font-semibold text-base cursor-pointer" onClick={handleResend}>Resend email</span>
            </div>
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerificationModal;
