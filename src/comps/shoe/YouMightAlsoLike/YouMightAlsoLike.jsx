import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import './YouMightAlsoLike.css'
const YouMightAlsoLike1 = ({items}) => {

    const [threepic,setThreepic]=useState([])
const [num,setNum] = useState(-1)


    useEffect(()=>{
      let temp = 0
let arr =[items[temp++],items[temp++],items[temp++]]
setThreepic(arr)
setNum(temp)
    },[])

    useEffect(()=>{
if(num<0){
  return
}
if(num>=0&&num<9){
setTimeout(()=>{
  let temp = num
  let arr =[items[temp++],items[temp++],items[temp++]]
  setThreepic(arr)
  setNum(temp)
},4000)
}
if(num==9){
  setNum(0)
}


    },[num])


  

  return (
    <div className="container">
        <div className="row justify-content-between">
{threepic.map((item,index)=>(<div key={index} className='col-12 col-lg-3'><Link to={`/shoe/${item.prod.pProductID}/${item.prod.scColorID}`}>{item.img}<h6 className='mt-1'>{item.prod.pModel}</h6>{item.prod.pGender == 'm'? <p className='mt-1'>Man's Shoes</p>:<p className='mt-1'>Women's Shoes</p>}<p>₪{item.prod.price}</p></Link></div>))}

        </div>
    </div>
  )
}

export default YouMightAlsoLike1