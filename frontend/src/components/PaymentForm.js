// PaymentForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from "react-router-dom";


//import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe("pk_test_51NxiJlSIDBjc3MxT8rVMzlzCqxPwL6Mfz3YPIDcrzzSYijju4yTG7gFPMg2E171fpl61tqqpqYVHjoKYpxFrJa2s00G8KYBY22");

function PaymentForm({ handlePayment }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const successDisplay = async (e) => {
    navigate("/success"); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token, error } = await stripe.createToken(elements.getElement(CardElement));
   
    if (error) {
      console.log(error);
      // Handle error, e.g., display an error message to the user
    } else {
      // Send the token to your server for payment processing
      handlePayment(token);
      
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Card Details</label>
        <CardElement />
      </div>
      <button type="submit" onClick={successDisplay} className='btn btn-success my-4'>Proceed</button>
      
    </form>
    
  );
}
export default PaymentForm;
