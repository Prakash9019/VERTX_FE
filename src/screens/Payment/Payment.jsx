import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
    const [orderId, setOrderId] = useState(`order_${Date.now()}`);
    const [orderAmount, setOrderAmount] = useState(100); // Change as needed
    const [customerEmail, setCustomerEmail] = useState("test@example.com");
    const [customerPhone, setCustomerPhone] = useState("9876543210");

    const handlePayment = async () => {
        try {
            const response = await axios.post("http://localhost:4000/payment/create-order", {
                orderId,
                orderAmount,
                customerPhone,
                customerEmail
            });
             console.log("Order Created:", response.data);
            // Replace the following URL with your own payment gateway URL
            window.location.href = response.data.payment_link;
        } catch (error) {
            console.error("Payment Error:", error.response?.data || error);
        }
    };

    return (
        <div>
            <h2>Pay ₹{orderAmount}</h2>
            <button onClick={handlePayment}>Proceed to Pay</button>
        </div>
    );
};

export default Payment;



// import React, { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

// const PaymentSuccess = () => {
//     const [searchParams] = useSearchParams();
//     const orderId = searchParams.get("order_id");

//     useEffect(() => {
//         const verifyPayment = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/payment/verify?order_id=${orderId}`);
//                 console.log("Payment Verified:", response.data);
//             } catch (error) {
//                 console.error("Verification Error:", error.response?.data || error);
//             }
//         };
//         verifyPayment();
//     }, [orderId]);

//     return <h2>Payment Successful! Order ID: {orderId}</h2>;
// };

// export default PaymentSuccess;
