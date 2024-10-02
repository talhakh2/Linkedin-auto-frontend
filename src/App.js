
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import axios from 'axios';
import './App.css';
import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import Signup from './components/signup';
import Signin from "./components/signin";
import Dashboard from "./components/Layout/dashboard";
import SettingsPage from "./pages/settings";
import VerificationModal from "./components/ui/verificationModel";
import Pricing from "./pages/pricing/pricing";
import PaymentSuccess from "./pages/pricing/PaymentSuccess.jsx";
import { useSelector } from 'react-redux'
import { removeUser } from './store/features/AuthenticationSlice';
import ForgotPassword from "./components/ui/forgotPassword.jsx"
import ResetPassword from "./components/ui/resetPassword.jsx";

function App() {

  const userId = useSelector(state => state.authentication._id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/v1/users/current-user`, { withCredentials: true });
        console.log("userid changed: ", response.data); // You can handle the response data here
        
      } catch (error) {
        console.error('Error fetching the current user:', error);
        dispatch(removeUser());
      }
    };
  
    fetchData();
  }, [userId]);

  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard if already logged in */}
        <Route path={'/'} element = {userId ? <Dashboard /> : <Signup />} />
        <Route path={'/login'} element = {userId ? <Dashboard /> : <Signin />} />
        <Route path={'/verification'} element = {userId ? <Dashboard /> : <VerificationModal />} />
        <Route path={'/forgot-password'} element = {userId ?  <Dashboard /> : <ForgotPassword />} />
        <Route path={'/reset-password'} element = {userId ?  <Dashboard /> : <ResetPassword />} />


        {/* Need login to access these route */}
        <Route path={'/dashboard'} element = {!userId ? <Signin/>  : <Dashboard />} />
        <Route path={'/settings'} element = {!userId ? <Signin/>  : <SettingsPage />} />
        <Route path={'/pricing'} element = {!userId ? <Signin/> : <Pricing /> } />
        <Route path={'/success'} element={!userId ? <Signin/> : <PaymentSuccess />} />

      </Routes>
    </Router>
  );
}

export default App;





// import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
// import './App.css';
// import Signup from './components/signup';
// import Signin from "./components/signin";
// import Dashboard from "./components/Layout/dashboard";
// import SettingsPage from "./pages/settings";
// import VerificationModal from "./components/ui/verificationModel";
// import Pricing from "./pages/pricing/pricing";
// import { useSelector } from 'react-redux'
// import ForgotPassword from "./components/ui/forgotPassword.jsx"
// import ResetPassword from "./components/ui/resetPassword.jsx";
// import { useEffect, useState } from "react";
// import axios from 'axios'

// function App() {

//   const userId = useSelector(state => state.authentication._id);

//   const [isUser, setisUser] = useState(false)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiUrl = process.env.REACT_APP_API_URL;
//         const response = await axios.get(`${apiUrl}/api/v1/users/current-user`, { withCredentials: true });
//         console.log(response.data); // You can handle the response data here
//         setisUser(true)
//       } catch (error) {
//         console.error('Error fetching the current user:', error);
//       }
//     };
  
//     fetchData();
//   }, [userId]);

//   return (
//     <Router>
//       <Routes>
//         {/* Redirect to dashboard if already logged in */}
//         <Route path={'/'} element = {isUser ? <Dashboard /> : <Signup />} />
//         <Route path={'/login'} element = {isUser ? <Dashboard /> : <Signin />} />
//         <Route path={'/verification'} element = {isUser ? <Dashboard /> : <VerificationModal />} />
//         <Route path={'/pricing'} element = {userId ?  <Dashboard /> : <Pricing />} />
//         <Route path={'/forgot-password'} element = {isUser ?  <Dashboard /> : <ForgotPassword />} />
//         <Route path={'/reset-password'} element = {isUser ?  <Dashboard /> : <ResetPassword />} />

//         {/* Need login to access these route */}
//         <Route path={'/dashboard'} element = {!isUser ? <Signin/>  : <Dashboard />} />
//         <Route path={'/settings'} element = {!isUser ? <Signin/>  : <SettingsPage />} />
//       </Routes>
//     </Router>
//   );
// }




// export default App;
