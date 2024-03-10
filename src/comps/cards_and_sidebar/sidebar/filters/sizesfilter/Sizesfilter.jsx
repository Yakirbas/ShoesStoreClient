import React, { useEffect, useState } from 'react'
import { usemyfiltercontext } from '../../../../../contexts/filterContext';
import { usemycontext } from '../../../../../contexts/itemsContext';
import { IoIosArrowDown,IoIosArrowUp } from 'react-icons/io';
import './Sizesfilter.css'
const Sizesfilter = () => {

    const contextfilter = usemyfiltercontext();
    const contextitem = usemycontext();
    const [sizes,setSizes] = useState([])
    const [hidefilter,setHidefilter]=useState(false)

    useEffect(()=>{
        if(contextitem.testData){

            /* יצירת שלשות לטובת עיצוב */
            let arr = []
            let arr2 = []
            let j = 0
            
            for (let i = 0; i < contextitem.sizeexist.length; i++) {
           
            
            if(j < 3){
                let tempobj = contextitem.sizeexist[i]
                tempobj.choose = contextfilter.sizefilt == contextitem.sizeexist[i].sSize? true : false
arr2.push(tempobj)
j++
            }
            if(j == 3){
                arr.push(arr2)
                
                arr2 = []
                j = 0
            }
            if(i+1 == contextitem.sizeexist.length && j!=0){
                arr.push(arr2)
            }
           
            }
         
            setSizes(arr)
        }
    },[])

    const hidefilterfunc = () =>{
        setHidefilter(!hidefilter)
      }

      const sizefilter = (size) =>{
        let arr = [...sizes]
        if(size.sSize == contextfilter.sizefilt){
        contextfilter.setSizefilt(1)
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                    arr[i][j].choose= false

            }
            
        }
        setSizes(arr)
        }
        else{
contextfilter.setSizefilt(size.sSize)
size.choose = !size.choose
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if(arr[i][j].sSize != size.sSize && arr[i][j].choose){
            arr[i][j].choose = !arr[i][j].choose
        }
        
    }
    
}
setSizes(arr)
    }
      }

  return (
    sizes.length >0? 
    <div className="row sizes my-5">
    <h5 className='col-6 mt-2'>Sizes</h5>
    <div onClick={hidefilterfunc} className="icon col-6 d-flex justify-content-end align-items-center">{hidefilter ? <IoIosArrowDown/> : <IoIosArrowUp/>}</div>
    <div className="row col-12 gap-2" hidden={hidefilter}>


    {
    sizes.map((size,index) =>(
        <div key={index} className='container'>
            <div className="row d-flex justify-content-around">


<div className="col-2" onClick={()=>{sizefilter(size[0])}} >
{size[0].choose?
    <div className="col-12  text-center" style={{height:'32px',width:'52px', cursor:'pointer',boxShadow:'5px 2px 2px 2px gray' ,backgroundColor:'black',color:'white'}}>{size[0].sSize}</div>
:
<div className="col-12 border text-center" style={{height:'30px',width:'50px', cursor:'pointer'}}>{size[0].sSize}</div>
}
</div>

{size[1]? <div className="col-2" onClick={()=>{sizefilter(size[1])}} >
    {size[1].choose?
    <div className="col-12 text-center" style={{height:'30px',width:'50px', cursor:'pointer',boxShadow:'5px 2px 2px 2px gray' ,backgroundColor:'black',color:'white'}}>{size[1].sSize}</div>
:
<div className="col-12 border text-center" style={{height:'30px',width:'50px', cursor:'pointer'}}>{size[1].sSize}</div>
}
</div> : <></>}


{size[2]? <div className="col-2" onClick={()=>{sizefilter(size[2])}} >
{size[2].choose?
    <div className="col-12 text-center" style={{height:'30px',width:'50px', cursor:'pointer',boxShadow:'5px 2px 2px 2px gray' ,backgroundColor:'black',color:'white'}}>{size[2].sSize}</div>
    :
    <div className="col-12 border text-center" style={{height:'30px',width:'50px', cursor:'pointer'}}>{size[2].sSize}</div>
}
</div> : <></>}




            </div>
        </div>
    ))
}



    </div>
    </div>
    :<div>Loading.....</div> 
  )
}

export default Sizesfilter