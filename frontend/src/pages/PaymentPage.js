// PaymentPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentForm from '../components/PaymentForm'; // Import the PaymentForm component
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51NxiJlSIDBjc3MxT8rVMzlzCqxPwL6Mfz3YPIDcrzzSYijju4yTG7gFPMg2E171fpl61tqqpqYVHjoKYpxFrJa2s00G8KYBY22");

function PaymentPage() {
  const [supplier, setSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(''); // Add payment method state
  //const [error, setError] = useState(false);
  useEffect(() => {
    // if (
    //     accountNumber.length !== 0 ||
    //     amount.length === 0 ||
    //     selectedSupplier.length === 0 ||
    //     paymentMethod.length === 0
    //   ) {
    //     setError("Fields Cannot Be Empty");
    //     return;
    //   }
    axios.get("http://localhost:7000/supplier").then((res) => {
      setSupplier(res.data.supplier);
      
    });
  }, []);
  

  const handlePayment = async (token) => {
    try {
      const response = await axios.post('http://localhost:7000/payment/create-payment-intent/', {
        supplierId: selectedSupplier,
        amount,
        accountNumber,
        paymentMethod: token ? 'card' : 'other', 
        token, 
      });
      
      if (response.data.success) {
     
        setPaymentStatus('Payment successful');
        console.log(response);
        console.log("Confrimation Initialized");
        const paymentIntentId =response.data.paymentIntent.id;
        console.log(paymentIntentId);
       
        if (response.data.success) {
          console.log("SUCCESSFULL")
          //success
        } else {
          console.log("NOT SUCCESSFULL")
         }
    
      } else {
        setPaymentStatus('Payment failed');
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus('Payment initiation failed');
    }
  };

  return (
    <div className="container my-4">
      <h3>Payment Form</h3><br></br>
    <form onSubmit={handlePayment}>
      <div className="my-3">
        <label >Select Supplier:</label>
        <select
        className="form-select w-50"
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
        >
          <option value="">Select a supplier</option>
          {supplier.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.supplierName}
            </option>
          ))}
        </select>          
      </div>   

      <div className="my-3">
        <label className="form-label">Enter Account Number </label>
        <input
          type="text"
          className="form-control w-50"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Account Number"
        />
      </div>
      <div className="my-3">
        <label className="form-label">Enter Amount:</label>
        <input
         className="form-control w-50"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>
      <div className="my-3">
        <label>Payment Method:</label>
        <select
         className="form-control w-50"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select payment method</option>
          <option value="card">Card</option>
          <option value="other">Other</option>
        </select>
      </div>
  
       {paymentMethod === 'card' && (
        <Elements stripe={stripePromise}>
          <PaymentForm stripe={stripePromise} handlePayment={handlePayment} />
        </Elements>
      )}
     
      {paymentStatus && (
        <div className={paymentStatus === 'Payment successful' ? 'success' : 'error'}>
          {paymentStatus}
        </div>
      )}

      {paymentStatus && (
        <div className={paymentStatus === 'Payment successful' ? 'success' : 'error'}>
          {paymentStatus}
        </div>
      )}
    </form>
    {/* {error ? (
        <div>
          <p className="text-danger">Fields Cannot Be Empty</p>
        </div>
      ) : null} */}
    </div>
   
  );
}

export default PaymentPage;
