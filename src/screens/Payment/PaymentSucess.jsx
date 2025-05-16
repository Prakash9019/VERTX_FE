import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");
    const [paymentStatus, setPaymentStatus] = useState("Verifying...");

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/payment/verify?order_id=${orderId}`);
                
                if (response.data.order_status === "PAID") {
                    setPaymentStatus("Payment Successful!");
                } else {
                    setPaymentStatus("Payment Failed or Pending.");
                }
            } catch (error) {
                setPaymentStatus("Verification Failed.");
                console.error("Verification Error:", error.response?.data || error);
            }
        };

        if (orderId) {
            verifyPayment();
        }
    }, [orderId]);

    return <h2>{paymentStatus} Order ID: {orderId}</h2>;
};

export default PaymentSuccess;
