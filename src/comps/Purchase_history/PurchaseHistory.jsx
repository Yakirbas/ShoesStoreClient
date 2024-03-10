import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../contexts/userContext';
import { usemycontext } from '../../contexts/itemsContext';

const PurchaseHistory = () => {
    const contextitem = usemycontext()
    const usercontext = useUserContext()
const [itemarr,setItemarr]= useState([])


useEffect(()=>{
 
 if(contextitem.testData==true){
  setItemarr(contextitem.shoescolors)
 
 }
},[contextitem.testData])
useEffect(()=>{

},[itemarr])

useEffect(()=>{
console.log(usercontext.cookies)
},[contextitem.cookies])



const test = (item)=>{
  let arr = itemarr.filter(item1 =>item1.pProductID == item.OiProductID && item1.scColorID == item.OIColorID)
return arr[0].scImage
}
  return (
    usercontext.purchaseHistory.length > 0 && contextitem.testData && itemarr.length>0 && usercontext.cookies.access_token?
    <div className='container'>
<h1 className='text-center mt-3'>Purchase History</h1>

{usercontext.purchaseHistory.map((items,index)=>(<div key={index} className='contianer border mt-5'>
<h3 className='text-center'>PayPal invoice number: {items[0].order_paypal_id}</h3>
<div className="row mt-3">
<div className='col-4 col-lg-2'> <h6>Name: {items[0].given_name}</h6></div> 
<div className='col-4 col-lg-2'> <h6>city: {items[0].city}</h6></div> 
   <div className='col-4 col-lg-2'> <h6>address: {items[0].address}</h6></div> 
   <div className='col-4 col-lg-2'> <h6>country: {items[0].currency_code}</h6></div> 
   <div className='col-4 col-lg-2'> <h6>postal_code: {items[0].postal_code}</h6></div>
   <div className='col-4 col-lg-2'> <h4>Total: {items[0].total} {items[0].currency_code}</h4></div> 
</div>
{items.map((item,index1)=>(<div key={index1} className='container mt-2 border'>
    <div className='row justify-content-between'>
    <div className='col-3'>  <h5>{item.OipModel}:</h5></div> 
    <div className='col-3' > <img className='col-12' src={test(item)} alt=""  /></div> 
    <div className='col-2'>  <h6>Size: {item.OisSize}</h6></div> 
    <div className='col-2'> <h5>Price: {item.price_per_item} {item.currency_code}</h5></div> 
    </div>
</div>))}

</div>))}

    </div>:<div className='container mt-5 text-center'><h1>Please Log In</h1></div>
  )
}

export default PurchaseHistory