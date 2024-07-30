import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutFormStripe: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [cartId, setCartId] = useState<string | null>(null);

    useEffect(() => {
        // Fetch your cart from Medusa before payment  
        const fetchCart = async () => {
            const response = await fetch('/api/cart'); // Your API endpoint  
            const cart = await response.json();
            setCartId(cart.id);
        };

        fetchCart();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!stripe || !elements || !cartId) return;
        // console.log('here');

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });


            if (paymentError) {
                setError(paymentError.message);
                setSuccess(null);
            } else {
                setError(null);

                // Send paymentMethod.id and cartId to your Medusa server for processing  
                const response = await fetch('http://localhost:9000/store/checkout', {
                    method: 'POST',
                    body: JSON.stringify({ paymentMethodId: paymentMethod.id, cartId }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    setError('Payment failed. Please try again.');
                } else {
                    setSuccess('Payment succeeded!');
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
        </form>
    );
};

export default CheckoutFormStripe;