import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    // Extract paymentId from the URL
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get('paymentId');

    // Fetch payment details based on the extracted paymentId
    // You might want to make an API request to your server to get the details
    // Example using axios:
    
/*     axios.get(`/api/payments/${paymentId}`)
      .then(response => setPaymentDetails(response.data))
      .catch(error => console.error('Error fetching payment details:', error));
     */

    // For the sake of this example, setting payment details directly from URL parameters
    setPaymentDetails({
      paymentId,
      token: searchParams.get('token'),
      payerId: searchParams.get('PayerID'),
    });

    window.location.href = approvalUrl;
  }, [location.search]);

  return (
    <div>
      {/* Uncomment the following section if you want to display payment details */}
      <h1>Payment Successful!</h1>
      {paymentDetails && (
        <div>
          <p>Payment Details:</p>
          <pre>{JSON.stringify(paymentDetails, null, 2)}</pre>
        </div>
      )} 
    </div>
  );
};

export default SuccessPage;