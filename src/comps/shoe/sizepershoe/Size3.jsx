import React, { useEffect, useState } from 'react'

const Size3 = ({sizes,setChoosensize,choosensize,setSizeshoe,index1,sizeshoe}) => {

 const [choose,setChoose] = useState(0)



const onclicksize = (index,size)=>{

let arr = [...sizeshoe]


for (let i = 0; i < arr.length; i++) {
  
  for (let j = 0; j < arr[i].length; j++) {
   
    arr[i][j].choosen=false
  }
  
}
if(size==choose){
  setChoose(0)
setChoosensize(0)
setSizeshoe(arr)
return
}
     
setChoose(size)
setChoosensize(size)
arr[index1][index].choosen=true
setSizeshoe(arr)
  }




/* לטפל בבעית בחירת מידה */

  return (
    sizes.map((size,index)=>(
      size.choosen?
    <button onClick={()=>{onclicksize(index,size.sSize)}} key={index} type="button" className="btn btn-secondary col-3" style={{animation: 'myanimation 2s infinite',backgroundColor:"grey"}}>{size.sSize}</button>
    :
    <button onClick={()=>{onclicksize(index,size.sSize)}} key={index} type="button" className="btn btn-secondary col-3 ">{size.sSize}</button>
    )
    
    )
  )
}

export default Size3