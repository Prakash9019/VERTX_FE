import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { data, useParams } from 'react-router-dom';
import { load } from '@cashfreepayments/cashfree-js';

const Cashfree1 = () => {
    const params = useParams();
    const isSessionId = params.sessionid;
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [cashfree, setCashfree] = useState(null);

    // Load Cashfree inside useEffect
    useEffect(() => {
        const initializeCashfree = async () => {
            const cashfreeInstance = await load({ mode: "production" }); // or "production"
            setCashfree(cashfreeInstance);
        };
        initializeCashfree();
    }, []);

    const getSessionId = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/payment/create-order');
            setLoading(false);

            if (res.data.payment_session_id) {
                setSessionId(res.data.payment_session_id);
                setOrderId(res.data.order_id);
                return res.data.payment_session_id;
            } else {
                throw new Error("Payment session ID not received");
            }
        } catch (err) {
            setLoading(false);
            console.error(err);
            throw err;
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const paymentSessionId = await getSessionId();
            if (!cashfree) {
                console.error("Cashfree SDK not loaded");
                return;
            }

            let checkoutOptions = {
                paymentSessionId: paymentSessionId,
                redirectTarget: "_modal",
            };

            cashfree.checkout(checkoutOptions).then((result) => {
                console.log("Payment successful");
                if (result.error) {
                    alert(result.error.message);
                }
                if (result.redirect) {
                    console.log("Redirection", result);
                }
            });
        } catch (err) {
            console.error("Error during payment:", err);
        }
    };

    useEffect(() => {
        setSessionId(isSessionId);
    }, [isSessionId]);

    return (
        <div className='main'>
            <div className='card px-5 py-4 mt-5'>
                <div className='col-12 center'>
                    <button className='w-100' type="button" onClick={handlePayment}>
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cashfree1;
