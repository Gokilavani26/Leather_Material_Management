import React from 'react';
import successImage from '../images/payment-success.png';

function SuccessPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
     <img src={successImage} alt="Success" width="100" height="100" /> 
     
      <h1> Payment Successful</h1>
      <p></p>
      {/* You can display any additional information or order details here */}
    </div>
  );
}

export default SuccessPage;
