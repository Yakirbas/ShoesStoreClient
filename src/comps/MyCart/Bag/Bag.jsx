import React, { useEffect, useState } from 'react'
import { usemycontext } from '../../../contexts/itemsContext';
import { useUserContext } from '../../../contexts/userContext';
import { AiFillDelete } from 'react-icons/ai';
const Bag = (setAllbag) => {

  const contextitem = usemycontext()
  const usercontext = useUserContext()
const [showbag,setShowbag] =useState([])

useEffect(()=>{


if(contextitem.testData2){
  margebaganditems()
}

},[contextitem.testData2])

useEffect(()=>{
  margebaganditems()
},[usercontext.userBag])

useEffect(()=>{{
  setAllbag.setAllbag(showbag)
}},[showbag])


const margebaganditems = () =>{
  
    let arr = []
let total = 0.000

    for (let index = 0; index < usercontext.userBag.length; index++) {
      let shoeDet = contextitem.shoescolors.filter((shoe) =>shoe.pProductID==usercontext.userBag[index].shoe_id && shoe.idcolorforsize ==usercontext.userBag[index].shoecolor_id)
      let colorandqun = contextitem.shoescolorssizes.filter((shoe) => shoe.pProductID==usercontext.userBag[index].shoe_id && shoe.idcolorforsize ==usercontext.userBag[index].shoecolor_id && shoe.sSize ==usercontext.userBag[index].size)
     let newobj= {shoeDet:shoeDet,colorandqun:colorandqun}
    
     
total+=newobj.shoeDet[0].price

arr[index]=newobj
    }
  
    usercontext.setTotalBag(total.toFixed(2))
   
    setShowbag(arr)

}


const deleteItem = (item) =>{
  usercontext.removeshoefrombag(item)

 
}

  return (
    contextitem.testData2 && usercontext.userBag?
<div className="container-fluid">
<h1>Bag</h1>

    {showbag.map((item,index)=>( 
       <div key={index} className='container-fluid border-bottom mt-5 mb-5 '>
    
    <div className="container-fluid">
        <div className="row">
            <div className="col-4"><img className='col-12'  src={item.shoeDet[0].scImage} alt=""/></div>
            <div className="col-6">

            <h4>{item.shoeDet[0].pModel}</h4>
            <h5>{item.shoeDet[0].pGender == 'm'? "Men's Shoes" : "Women's Shoes"}</h5>
            <h6>{item.shoeDet[0].cColor}</h6>
            <div className="row">
                <div className="col-6"><h4 >Size</h4><h5>{item.colorandqun[0].sSize}</h5></div>
                <div className="col-6"><h4 className='text-center'>Quantity</h4><h5 className='text-center'>{usercontext.userBag[index]?.quantity}</h5></div>
            </div>

            </div>
            <div className="col-2"><p>₪{item.shoeDet[0].price}</p> <button onClick={()=>{deleteItem(item)}}  style={{background:"none",border:"none"}} className='col-7 mt-5'><AiFillDelete/></button></div>
        </div>
    </div>
</div>))}
</div>
    :
    <div>Loading</div>
  )
}

export default Bag