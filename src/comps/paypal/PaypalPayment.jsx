import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios, { all } from 'axios';
import { useUserContext } from '../../contexts/userContext';

const PaypalPayment = (allbag) => {

  const usercontext = useUserContext()
  const navigate = useNavigate();
  const [paidFor, setPaidFor]=useState(false);
  const [error,setError] = useState(null);
  const [testbag,setTestbag]=useState([])
 const [check,setCheck]=useState(false)
  

useEffect(()=>{
setTestbag(createbag())


},[allbag])


useEffect(()=>{
    if(check){
      setCheck(false)
setTimeout(()=>{
setCheck(true)
},500)
  
    }
    else{
      setCheck(true)
    }
  
},[testbag])


const createbag = ()=>{
  if(allbag){
    let arr = []
    for (let index = 0; index < allbag.allbag.allbag.length; index++) {
      arr[index]=  {
        "unit_amount": {
          "currency_code": "ILS",
          "value": allbag.allbag.allbag[index].shoeDet[0].price
        },
        "quantity": "1",
        "name":allbag.allbag.allbag[index].shoeDet[0].pModel
      }
    
    }
    return arr
  
  }
return []
}

  const createOrder = async (data, actions) => {

    const testValue2=testValue(testbag)
    return actions.order.create({
  /*   purchase_units:[ {amount:{value:150,currency:"ILS"}},{items:[{name:"yakir1"},{name:"yakir2"}]}] [
      {
        description:"test pro",
        amount:{value:150}
      },
      {
        description:"test pro",
        amount:{value:150}
      }
    ] */  


    "purchase_units": [{
      "description": "Shoes Store",
      "amount": {
        "value": usercontext.totalBag,
        "currency_code": "ILS",
        "breakdown": {
          "item_total": {
            "currency_code": "ILS",
            "value": usercontext.totalBag-testValue2.reduce((a, b) => a + b.unit_amount.value, 0)<1?usercontext.totalBag:testValue2.reduce((a, b) => a + b.unit_amount.value, 0)
          },
        }
      },
      "items": testValue2
    }
  ]

    
   }) 
};

const testValue=(one)=>{
  if(one.length==allbag.allbag.allbag.length){
    
    return one
  }
  else{
   
return createbag()
  }
  }

  const onApprove = async (data, action) => {

    const order = await action.order.capture();
   

    const objfordata = {}
    objfordata.data=data
    objfordata.order=order
    objfordata.bag=allbag.allbag.allbag
    objfordata.user=usercontext.user

    console.log(objfordata)
   
    

    setCheck(false)
    setTimeout(()=>{
    setCheck(true)
    },500)

    handleApprove(objfordata)
    
  };

  const handleApprove =async (objfordata)=>{
   
setPaidFor(true)

try{
  let res = await axios.post('http://127.0.0.1:5000/payment/api/payments/orderpaid',objfordata)
  if(res.data.status == true){
    usercontext.allbag()
    window.location.href ="http://127.0.0.1:5173"
    navigate("/")
  }
}
catch(err){
  console.log(err)
}

  }

  if(paidFor){
    alert("Thank You for purchasing form Shoe's Store")
  }
  
  if(error){
    alert(error)
  }


  
  return (
    testbag.length>0?
<div>
{check?<PayPalButtons  className='mt-5'

onClick={(data,actions)=>{
  return actions.resolve()
}}
      createOrder={createOrder}
      onApprove={onApprove}
      onCancel ={()=>{}}
      onError ={(err)=>{
        setError(err)
        console.log("PayPal Checkout OnError",err)
      }}
    />:<></>}
</div>
:<>Loading</>
  )
}

export default PaypalPayment