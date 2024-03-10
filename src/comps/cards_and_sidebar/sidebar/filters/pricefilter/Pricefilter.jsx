import React, { useRef, useState } from 'react'
import './Pricefilter.css'
import { IoIosArrowDown,IoIosArrowUp } from 'react-icons/io';
import { usemyfiltercontext } from '../../../../../contexts/filterContext';
const Pricefilter = () => {
    const [hidefilter,setHidefilter]=useState(false)
    const contextitem = usemyfiltercontext();
    const underp = useRef();
    const overp = useRef();
    const betweenp = useRef();
    const betweenp1 = useRef();

    const hidefilterfunc = () =>{
      setHidefilter(!hidefilter)
    }

    const pricefilter = () =>{
      const under = underp.current.checked
      const over = overp.current.checked
      const between = betweenp.current.checked
      const between1 = betweenp1.current.checked
      if(under && over && between && between1){
        contextitem.setPricefilt(1)
      }
      else if(under && over && between){
        contextitem.setPricefilt(2)
      }
      else if(under && over && between1){
        contextitem.setPricefilt(3)
      }
      else if(under && between && between1){
        contextitem.setPricefilt(4)
      }
      else if(over && between && between1){
        contextitem.setPricefilt(5)
      }
      else if(under && over){
        contextitem.setPricefilt(6)
      }
      else if(under && between){
        contextitem.setPricefilt(7)
      }
      else if(under && between1){
        contextitem.setPricefilt(8)
      }
      else if(over && between){
        contextitem.setPricefilt(9)
      }
      else if(over && between1){
        contextitem.setPricefilt(10)
      }
      else if(between && between1){
        contextitem.setPricefilt(11)
      }
      else if(under){
        contextitem.setPricefilt(12)
      }
      else if(over){
        contextitem.setPricefilt(13)
      }
      else if(between){
        contextitem.setPricefilt(14)
      }
      else if(between1){
        contextitem.setPricefilt(15)
      }
      else{
        contextitem.setPricefilt(16)
      }
    }
    
  return (
    <div className="row price mt-5">
    <h5 className='title col-6 mt-2'>Price</h5>
    <div onClick={hidefilterfunc} className="icon col-6 d-flex justify-content-end align-items-center">{hidefilter ? <IoIosArrowDown/> : <IoIosArrowUp/>}</div>
    <div className="row col-12 gap-1" hidden={hidefilter}>

      <div className="container-fluid">

<div className="row ">
  {contextitem.pricefilt == 1 ||contextitem.pricefilt ==  2 || contextitem.pricefilt == 3 || contextitem.pricefilt == 4 || contextitem.pricefilt == 6 || contextitem.pricefilt == 7 || contextitem.pricefilt == 8 || contextitem.pricefilt == 12?
    <div className="inputdiv col-3 col-lg-4 col-xxl-3 d-flex align-items-center"><input onChange={pricefilter} ref={underp} className='col-12 inputbox' type="checkbox" style={{cursor:'pointer'}} checked/></div>
:
<div className="inputdiv col-3 col-lg-4 col-xxl-3  d-flex align-items-center"><input onChange={pricefilter} ref={underp} className='col-12 inputbox' type="checkbox" style={{cursor:'pointer'}} /></div>
  }
<div className="col-9 col-lg-8 col-xxl-9 textfil"><p className='mt-3'>Under ₪ 259.9</p></div>
</div>



      </div>


      <div className="container-fluid">

<div className="row ">
    { contextitem.pricefilt == 1 || contextitem.pricefilt == 2 || contextitem.pricefilt == 4 || contextitem.pricefilt == 5 || contextitem.pricefilt == 7 || contextitem.pricefilt == 9 || contextitem.pricefilt ==11 || contextitem.pricefilt == 14?
 <div className="inputdiv col-3 col-lg-4 col-xxl-3 d-flex align-items-center"><input onChange={pricefilter} ref={betweenp} className='inputbox col-12' type="checkbox" style={{cursor:'pointer'}} checked/></div>
 :
 <div className="inputdiv col-3 col-lg-4 col-xxl-3 d-flex align-items-center"><input onChange={pricefilter} ref={betweenp} className='inputbox col-12' type="checkbox" style={{cursor:'pointer'}} /></div>

    }
   

<div className="col-9 col-lg-8 col-xxl-9 textfil"><p className='mt-3'>₪259.9-₪519.9</p></div>
</div>



      </div>


      <div className="container-fluid">

<div className="row ">
   {contextitem.pricefilt == 1 || contextitem.pricefilt == 3 || contextitem.pricefilt == 4 || contextitem.pricefilt == 5 || contextitem.pricefilt == 8 || contextitem.pricefilt == 10 || contextitem.pricefilt == 11 || contextitem.pricefilt == 15 ?
     <div className="inputdiv col-3 col-lg-4 col-xxl-3 d-flex align-items-center"><input onChange={pricefilter} ref={betweenp1} className='inputbox col-12' type="checkbox" style={{cursor:'pointer'}} checked/></div>
     :
     <div className="inputdiv col-3 col-lg-4 col-xxl-3 d-flex align-items-center"><input onChange={pricefilter} ref={betweenp1} className='inputbox col-12' type="checkbox" style={{cursor:'pointer'}} /></div>
   }

<div className="col-9 col-lg-8 col-xxl-9 textfil"><p className='mt-3'>₪519.9-₪709.9</p></div>
</div>



      </div>



      
      <div className="container-fluid">

<div className="row ">
    {contextitem.pricefilt == 1 || contextitem.pricefilt == 2 || contextitem.pricefilt == 3 || contextitem.pricefilt == 5 || contextitem.pricefilt == 6 || contextitem.pricefilt == 9 || contextitem.pricefilt == 10 || contextitem.pricefilt == 13 ?
      <div className="inputdiv col-3 col-lg-4 col-xxl-3 d-flex align-items-center"><input onChange={pricefilter} ref={overp} className='inputbox col-12' type="checkbox" style={{cursor:'pointer'}} checked/></div>
      :
      <div className="inputdiv col-3 col-lg-4 col-xxl-3 d-flex align-items-center"><input onChange={pricefilter} ref={overp} className='inputbox col-12 ' type="checkbox" style={{cursor:'pointer'}} /></div>

    }

<div className="col-9 col-lg-8 col-xxl-9 textfil "><p className='mt-3'>Over ₪ 709.9</p></div>
</div>



      </div>


    </div>
    </div>
  )
}

export default Pricefilter