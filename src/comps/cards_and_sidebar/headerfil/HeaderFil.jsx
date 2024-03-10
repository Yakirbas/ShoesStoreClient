import React, { useEffect, useState } from 'react'
import './HeaderFil.css'
import {BsFilterSquareFill} from 'react-icons/bs';
import { usemyfiltercontext } from '../../../contexts/filterContext';
import { usemycontext } from '../../../contexts/itemsContext';
const HeaderFil = ({Hidefilter}) => {
  const contextitem = usemyfiltercontext();
  const contextitem1 = usemycontext();
const [amountofshoes,setAmountofshoes]=useState(0)

const Hidefilterfunc = ()=>{
  Hidefilter.setHidefilter(!Hidefilter.hidefilter)
}

useEffect(()=>{
let temp = 0
if(contextitem1.cards){
  for (let index = 0; index < contextitem1.cards.length; index++) {
    temp += contextitem1.cards[index].length
    
  }
}
setAmountofshoes(temp)

},[contextitem1.cards])

  return (
    <div className='HeaderFil container-fluid '>
<div className="row ">
{contextitem.genderfilt == 'a'? <div className='col-6'><h1>All shoes({amountofshoes})</h1></div>:<></>}
{contextitem.genderfilt == 'all'? <div className='col-6'><h1>All shoes({amountofshoes})</h1></div>:<></>}
{contextitem.genderfilt == 'm'? <div className='col-6'><h1>Men's shoes({amountofshoes})</h1></div>:<></>}
{contextitem.genderfilt == 'w'? <div className='col-6'><h1>Women's shoes({amountofshoes})</h1></div>:<></>}
<div className='filters col-6' >
    <div className="row d-flex justify-content-around">
    <div onClick={Hidefilterfunc} className="hidebtn col-3 text-center mt-3">{Hidefilter.hidefilter? "Show Filters" : "Hide Filters" } <BsFilterSquareFill /></div>
    <div className="col-3 text-center mt-3 " >Sort By</div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default HeaderFil