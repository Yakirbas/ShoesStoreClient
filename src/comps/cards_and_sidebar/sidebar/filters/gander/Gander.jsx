import React, { useRef, useState } from 'react'
import { IoIosArrowDown,IoIosArrowUp } from 'react-icons/io';
import './Gander.css'
import { usemyfiltercontext } from '../../../../../contexts/filterContext';
const Gander = () => {

  const [hidefilter,setHidefilter]=useState(false)
  const menref = useRef();
  const womenref = useRef();
  const contextitem = usemyfiltercontext();

const hidefilterfunc = () =>{
  setHidefilter(!hidefilter)
}

const ganderfilter = ()=>{
  const mench = menref.current.checked
const womench = womenref.current.checked
if(mench && womench){
  contextitem.setGenderfilt('all')
}
else if(mench){
  contextitem.setGenderfilt('m')

}
else if(womench){
  
  contextitem.setGenderfilt('w')

}
else{
  contextitem.setGenderfilt('a')
}

}

  return (
    <div className="row gander">
    <h5 className='col-6 mt-2'>Gender</h5>
    <div onClick={hidefilterfunc} className="icon col-6 d-flex justify-content-end align-items-center">{hidefilter ? <IoIosArrowDown/> : <IoIosArrowUp/>}</div>
    <div className="row col-12 gap-2" hidden={hidefilter}>

      <div className="container">

<div className="row ">
  {contextitem.genderfilt == 'm' ||contextitem.genderfilt == 'all'?
    <div className="inputdiv col-3 "><input onChange={ganderfilter} ref={menref} className='col-12 inputbox' type="checkbox" style={{cursor:'pointer'}}  checked/></div>
  :
  <div className="inputdiv col-3 "><input onChange={ganderfilter} ref={menref} className='col-12 inputbox' type="checkbox" style={{cursor:'pointer'}}   /></div>
  }
<div className="col-9 "><h6>Men</h6></div>
</div>



      </div>


      <div className="container">

<div className="row ">
{contextitem.genderfilt == 'w' ||contextitem.genderfilt == 'all'?
    <div className="inputdiv col-3"><input onChange={ganderfilter} ref={womenref} className='inputbox col-12' type="checkbox" style={{cursor:'pointer'}} checked/></div>
:
<div className="inputdiv col-3"><input onChange={ganderfilter} ref={womenref} className='inputbox col-12' type="checkbox" style={{cursor:'pointer'}} /></div>
}
<div className="col-9"><h6>Women</h6></div>
</div>



      </div>


    </div>
    </div>
  )
}

export default Gander