import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../contexts/userContext'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PaypalPayment from '../../paypal/PaypalPayment';

const Summary = (allbag) => {
    const usercontext = useUserContext()
    const [total,setTotal]= useState(0)

    const initialOptions = {
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      currency: import.meta.env.VITE_currency,
      intent: import.meta.env.VITE_intent,
  };

    useEffect(()=>{
        setTotal(usercontext.totalBag)
     
    },[usercontext.totalBag])


    

  return (
    allbag&&total?
    <PayPalScriptProvider options={initialOptions}>
    <div className='container-fluid'>
<h1 className='text-center'>Summary</h1>
<div className="row mt-5 border-bottom border-top justify-content-between">
    <div className="col-4 fs-4">Total</div>
    <div className="col-4 text-end fs-4">₪{total.toLocaleString()}</div>
</div>
<PaypalPayment allbag={allbag}/>
{/* <button className='col-12 border rounded-pill mt-5'><img width="51" height="14" src="https://www.nike.com/assets/experience/pet/payment-icons/paypal@2x.png" alt="" /></button> */}

    </div>
    </PayPalScriptProvider>
    :<>Loading</>
  )
}

export default Summary

