import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { updateUser } from '../../store/features/AuthenticationSlice';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionID = searchParams.get('sessionId');
    const plan = searchParams.get('plan');
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(sessionID);

    useEffect(() => {
        console.log(sessionID, plan);
        if (sessionID) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/v1/checkout/success?sessionId=${sessionID}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                dispatch(updateUser({
                    plan: plan
                }));
                Navigate('/settings')
            }).catch((err) => {
                console.log(err)
                Navigate('/')
            })
        }
    }, [sessionID])
    return (
        <div className="h-60vg flex justify-center items-center">
            <p className='text-semibold text-xl text-blue-500'>Loading...</p>
        </div>
    )
}

export default PaymentSuccess