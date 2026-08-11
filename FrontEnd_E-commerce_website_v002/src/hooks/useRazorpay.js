import { createRazorpayOrder, verifyRazorpayPayment, clearCartApi } from '../service/api';

const useRazorpay = () => {
    const initiatePayment = async ({ amount, productName, onSuccess, onFailure }) => {
        try {
            const orderData = await createRazorpayOrder(amount);
            if (!orderData || !orderData.success) {
                alert("Payment initialization failed. Please try again.");
                return;
            }

            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "OneStop Shop",
                description: productName || "Purchase",
                order_id: orderData.orderId,

                handler: async function (response) {
                    const verifyData = await verifyRazorpayPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    });

                    if (verifyData && verifyData.success) {
                        
                        await clearCartApi();
                        onSuccess && onSuccess(verifyData.paymentId);
                    } else {
                        alert("Payment verification failed!");
                        onFailure && onFailure();
                    }
                },

                prefill: {
                    name: "Customer",
                    email: "customer@example.com",
                    contact: "9999999999"
                },
                theme: { color: "#8A33FD" }
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
            razorpayInstance.on('payment.failed', function (response) {
                alert("Payment Failed: " + response.error.description);
                onFailure && onFailure();
            });

        } catch (err) {
            console.error("Payment Error:", err);
            alert("Something went wrong!");
        }
    };

    return { initiatePayment };
};

export default useRazorpay;