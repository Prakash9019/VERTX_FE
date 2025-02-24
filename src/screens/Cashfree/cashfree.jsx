import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../paypal/paypal.css';
import { data, useParams } from 'react-router-dom';

import {load} from '@cashfreepayments/cashfree-js';

const cashfree = await load({
	mode: "sandbox" //or production
});

const Cashfree1 = () => {
    const params = useParams();
    const isSessionId = params.sessionid;
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [orderId, setOrderId] = useState('');
    
    const getSessionId = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/payment/');
            setLoading(false);
            console.log("hellojh");
            console.log(res);
    
            if (res.data.payment_session_id) {
                setSessionId(res.data.payment_session_id);
                console.log(res.data.payment_session_id);
                setOrderId(res.data.order_id);
                return res.data.payment_session_id;
            } else {
                throw new Error("Payment session ID not received");
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
            throw err;
        }
    };
    
    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const paymentSessionId = await getSessionId();
            console.log(paymentSessionId);
            let checkoutOptions = {
                paymentSessionId: paymentSessionId,
                // returnUrl: "http://localhost:5000/api/status/{order_id}",
                redirectTarget: "_modal",
            };
    
            cashfree.checkout(checkoutOptions).then(function (result) {
                console.log("Payment successful");
                if (result.error) {
                    alert(result.error.message);
                }
                if (result.redirect) {
                    console.log("Redirection");
                    console.log(result);
                }
            });
        } catch (err) {
            console.error("Error during payment:", err);
        }
    };
    
    useEffect(()=>{
        setSessionId(isSessionId)
    }, [isSessionId])

  return (
    <>
    <div className='main'>
        <div className='card px-5 py-4 mt-5'>

            {/* <form onSubmit={getSessionId}>
                <h1>Session Id</h1>
                <input type="text" value={sessionId} onChange={(e)=>{setSessionId(e.target.value)}} />
                {!loading? <div className='col-12 center'>
                    <button className='w-100 ' type="submit">getSessionID</button>
                </div>
                :
                <div className='col-12 center'>
                    <button className='w-100 text-center' type="submit">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden ">Wait...</span>
                    </div>
                    </button>
                </div>
                }
            </form> */}
            <div className='col-12 center'>
                <button className='w-100 ' type="submit" onClick={handlePayment}>Pay Now</button>
            </div>
        </div>
    </div>
   
    </>
  )
}

export default Cashfree1