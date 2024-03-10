import React, { useEffect, useState } from 'react'
import { usemyfiltercontext } from '../../../../../contexts/filterContext';
import { usemycontext } from '../../../../../contexts/itemsContext';
import { IoIosArrowDown,IoIosArrowUp } from 'react-icons/io';
import './Colors.css'
const Colors = () => {
    const contextfilter = usemyfiltercontext();
    const contextitem = usemycontext();
    const [colors,setColors]=useState([])
    const [hidefilter,setHidefilter]=useState(false)


    useEffect(()=>{
        if(contextitem.testData){

            /* יצירת שלשות לטובת עיצוב */
            let arr = []
            let arr2 = []
            let j = 0
    
            
            for (let i = 0; i < contextitem.colors.length; i++) {
           
            
            if(j < 3){
                let tempobj = contextitem.colors[i]
                tempobj.choose = contextfilter.colorfilt == contextitem.colors[i].cColor? true : false
arr2.push(tempobj)
j++
            }
            if(j == 3){
                arr.push(arr2)
                
                arr2 = []
                j = 0
            }
            if(i+1 == contextitem.colors.length && j!=0){
                arr.push(arr2)
            }
           
            }
          
            setColors(arr)
        }

    },[])

    const hidefilterfunc = () =>{
        setHidefilter(!hidefilter)
      }

      const filtcolor = (color) =>{
        
        let arr = [...colors]
        if(contextfilter.colorfilt == color.cColor){
            contextfilter.setColorfilt('Multi-Color')
            color.choose = !color.choose
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                        arr[i][j].choose= !arr[i][j].choose

                }
                
            }
setColors(arr)
        }
        else
        contextfilter.setColorfilt(color.cColor)
        color.choose = !color.choose
        

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if(arr[i][j].cColor != color.cColor && arr[i][j].choose){
                    arr[i][j].choose= !arr[i][j].choose
                }
                
            }
            
        }
        setColors(arr)
      }


  return (
    colors.length >0? 
    <div className="row colors mt-5">
    <h5 className='col-6 mt-2'>Colors</h5>
    <div onClick={hidefilterfunc} className="icon col-6 d-flex justify-content-end align-items-center">{hidefilter ? <IoIosArrowDown/> : <IoIosArrowUp/>}</div>
    <div className="row col-12 gap-2" hidden={hidefilter}>

{
    colors.map((color,index) =>(
        <div key={index} className='container'>
            <div className="row d-flex justify-content-around">

<div className="col-2" onClick={()=>{filtcolor(color[0])}} >
    {color[0].choose?
    <div className="col-12 rounded-5 bcolor" style={{height:'28px',width:'28px',animation: 'myanimation 2s infinite',backgroundColor:`${color[0].cColor}`, cursor:'pointer'}}></div>
:
<div className="col-12 rounded-5 bcolor" style={{height:'28px',width:'28px',backgroundColor:`${color[0].cColor}`, cursor:'pointer'}}></div>
}
    <p style={{fontSize:'12px'}}>{color[0].cColor}</p>
</div>

<div className="col-2 " onClick={()=>{filtcolor(color[1])}}>
{color[1].choose?
    <div className="col-12 rounded-5 bcolor" style={{height:'28px',width:'28px',animation: 'myanimation 2s infinite',backgroundColor:`${color[1].cColor}`, cursor:'pointer'}}></div>
:
<div className="col-12 rounded-5 bcolor" style={{height:'28px',width:'28px',backgroundColor:`${color[1].cColor}`, cursor:'pointer'}}></div>
}
    <p style={{fontSize:'12px'}}>{color[1].cColor}</p>
</div>

<div className="col-2 " onClick={()=>{filtcolor(color[2])}}>
{color[2].choose?
    <div className="col-12 rounded-5 bcolor" style={{height:'28px',width:'28px',animation: 'myanimation 2s infinite',backgroundColor:`${color[2].cColor}`, cursor:'pointer'}}></div>
:
<div className="col-12 rounded-5 bcolor" style={{height:'28px',width:'28px',backgroundColor:`${color[2].cColor}`, cursor:'pointer'}}></div>
}
    <p  style={{fontSize:'12px'}}>{color[2].cColor}</p>
</div>

            </div>
        </div>
    ))
}



    </div>
    </div>
    :<div>Loading.....</div> 
  )
}

export default Colors