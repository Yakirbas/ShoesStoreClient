import React, { useEffect, useRef } from 'react'
import './Advertising.css'

const Advertising = () => {
    const vidRef=useRef();

    useEffect(()=>{
          vidRef.current.play();  
    },[])
  return (
   <div className="container-fluid mt-5">
    <div className="row">
   
    <video className='videoscreen col-12' ref={vidRef}  autoPlay  controls='' loop muted>
        <source  src='./../../../shoevideo.mp4' type="video/mp4"/>
    </video>  
    </div>
    </div>
   
    
  )
}

export default Advertising