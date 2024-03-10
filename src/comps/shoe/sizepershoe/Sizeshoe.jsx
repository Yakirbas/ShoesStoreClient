import React, { useEffect, useState } from 'react'
import Size3 from './Size3'

const Sizeshoe = ({allsizes,shoeobj,setChoosensize,choosensize}) => {

    const [sizeshoe,setSizeshoe] = useState([])

    useEffect(()=>{
   
let arr = [...allsizes]

arr = arr.filter(size => size.idcolorforsize == shoeobj.idcolorforsize)

let temparr = []
let i = 0
for (let index = 0; index < arr.length; index=index) {
    let temparr2 = []
    let j = 0
    arr [index]? temparr2[j++]=arr[index++]:<></>
    arr [index-1]?temparr2[j-1].choosen=false:<></>
    arr [index]? temparr2[j++]=arr[index++]:<></>
    arr [index-1]?temparr2[j-1].choosen=false:<></>
    arr [index]? temparr2[j++]=arr[index++]:<></>
    arr [index-1]?temparr2[j-1].choosen=false:<></>

    j>0? temparr[i++]=temparr2 :<></>


}

console.log(temparr)
setSizeshoe(temparr)

    },[shoeobj])
  return (
    sizeshoe.map((sizes,index) =>(<div key={index} className='row justify-content-around mt-4'><Size3 sizes={sizes} setChoosensize={setChoosensize} choosensize={choosensize} setSizeshoe={setSizeshoe} index1={index} sizeshoe={sizeshoe}/></div>))
  )
}

export default Sizeshoe