import React, { useEffect, useState } from 'react'
import Bag from './Bag/Bag'
import { usemycontext } from '../../contexts/itemsContext';
import { useUserContext } from '../../contexts/userContext';
import Summary from './Summary/Summary';
import YouMightAlsoLike1 from '../shoe/YouMightAlsoLike/YouMightAlsoLike'
import useScreenType from "react-screentype-hook";

const MyCart = () => {
  const contextitem = usemycontext();
  const usercontext = useUserContext()
  const screenType = useScreenType({
    mobile: 575.98,
    tablet: 767.98,
    desktop: 991.98,
    largeDesktop: 1199.98,
  });
  const handleDragStart = (e) => e.preventDefault();
  
const [youMightAlsoLike,setYouMightAlsoLike]= useState([])
const [items,setItems]=useState([])

const[allbag,setAllbag]=useState([])

  useEffect(()=>{
    loaddata()
  console.log(allbag)
  },[])
 /*  userBag */


 useEffect(()=>{
  if(youMightAlsoLike){
    let items1 = []
    for (let index = 0; index < youMightAlsoLike.length; index++) {
        items1[index] = {img:<img className='col-12' src={youMightAlsoLike[index].scImage} onDragStart={handleDragStart} role="presentation" />,prod:youMightAlsoLike[index]}
        
    }
    
    setItems(items1)
  }
 
      },[youMightAlsoLike])


 function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const loaddata = ()=>{
  let numarr = [getRandomInt(contextitem.shoescolors.length)]
 for (let index = 1; index < 9; index++) {
  let num =getRandomInt(contextitem.shoescolors.length)
  for (let index2 = 0; index2 < index; index2++) {
      if(num == numarr[index2]){
          num =getRandomInt(contextitem.shoescolors.length)
          index2 = -1
          continue
      }
  }

  numarr[index] = num
 }
let temparr = []

for (let index = 0; index < numarr.length; index++) {
  temparr[index] = contextitem.shoescolors[numarr[index]]
  
}

   setTimeout(()=>{
      setYouMightAlsoLike(temparr)
   },1000)
  
}





  return (
    usercontext.user?
    usercontext.userBag.length>0 ?
    (screenType.isDesktop || screenType.isLargeDesktop)?
    /* מצב מחשב וטאבלט */
    <div className="container-fluid ">
      
    <div className="container ">
      <div className="row">
<div className="col-6"><Bag setAllbag={setAllbag}/></div>
<div className="col-4"><Summary allbag={allbag}/></div>
      </div>
    </div>

    <div className="container-fluid border mt-1">
    <div className="row">
    <h4>You Might Also Like</h4>


    {items?.length>0?<YouMightAlsoLike1 items={items}/>:<>LOading...</>}

 
</div>
      </div>

    </div>:
    /* מצב נייד */
    <div className="container-fluid ">
      
    <div className="container-fluid ">
      <div className="row">
<div className="col-12"><Bag setAllbag={setAllbag}/></div>
<div className="col-12"><Summary allbag={allbag}/></div>
      </div>
    </div>

    <div className="container-fluid border mt-1">
    <div className="row">
    <h4>You Might Also Like</h4>


    {items?.length>0?<YouMightAlsoLike1 items={items}/>:<>LOading...</>}

 
</div>
      </div>

    </div>


    /* במקרה ואין כלום בעגלה */
    :<div className='container-fluid'
    ><div className='container text-center'><h3 className='mt-5'>Your cart is empty,
    In order to purchase a product you must add it to the cart.</h3>
    <h1 className='mt-5'>Happy shopping</h1>
    </div>
    {items?.length>0?<YouMightAlsoLike1 items={items}/>:<>LOading...</>}
    </div>
    :
    <div>
    <h1 className='mt-5 text-center'>Please Log In</h1>
    {items?.length>0?<YouMightAlsoLike1 items={items}/>:<>LOading...</>}
    </div>
  )
}

export default MyCart