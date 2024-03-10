
import React from 'react';

const CancelPage = () => {
  return (
    <div>
      <h1>Payment Canceled</h1>
      <p>It seems like you canceled the payment. If you'd like to try again, please click the button below:</p>
      {/* Add a button or link to navigate the user to the payment page */}
      <button onClick={()=>{}}>Retry Payment</button>
    </div>
  );
};
export default CancelPage;