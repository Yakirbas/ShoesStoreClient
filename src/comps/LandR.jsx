import React, { useState } from 'react'
import './LandR.css'
import Login from './login/Login.jsx'
import Register from './register/Register.jsx'
const LandR = () => {
    const [choice,setChoice]=useState(true)

  return (
    <div className='landr'>
<div className="container-fluid">
       <div className="row justify-content-center">
        <div className="col-6 lr-box mt-5">

<div className="container mt-3">
    <div className="row justify-content-center">
        <div className="col-6 d-flex justify-content-end"><button onClick={()=>setChoice(true)} type="button" className="btn btn-light">Login</button></div>
        <div className="col-6 d-flex justify-content-start"><button onClick={()=>setChoice(false)} type="button" className="btn btn-light">Registar</button></div>
    </div>
</div>

<div className="container-fluid border mt-3"></div>

{choice?<Login/>:<Register/>}
        </div>
       </div>
   
</div>

    </div>
  )
}

export default LandR