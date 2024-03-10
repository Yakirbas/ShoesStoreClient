import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import './Resetpassword.css'
import axios from 'axios';

const Resetpassword = () => {
const [password,setPassword] = useState()
const {id,token} = useParams()

    const nagv= useNavigate()
    const [confirmerr,setConfirmerr] = useState('')
        const {
            register,
            handleSubmit,
            formState: { errors },
            watch
          } = useForm();
          const [errorfromdata,setErrorfromdata] = useState()
    
          const submit =async (obj)=>{
            console.log(obj)
             try{
              const res = await axios.post(`${import.meta.env.VITE_SERVER}/user/reset-password/${id}/${token}`,obj,{withCredentials:true})
             console.log(res)
              if(res.status == 200){
                nagv("/login")
              }
            }catch(err){
              console.log(err)
              setErrorfromdata(err.response.data)
            }
            finally{
    console.log("עובד אחר כך")
            } 
          }
  return (
    <div className='forgetpass container-fluid mt-2'>

    <div className="container d-flex justify-content-center"><h1>Reset Password</h1></div>
    
    <form className='container' onSubmit={handleSubmit((data) => submit(data))}>
  
    <div className="row mt-3"><input className='col-12' type={"password"} {...register('password', { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ , required: true })} placeholder="password"/></div>
     
     <div className="row rowerr "><p className='col-12  err'>{errors.password && "Please enter legel password"}</p></div>
<div className="row mt-3">
<input className='col-12' type={"password"}
{...register("confirm_password", {
 required: true,
 validate: (val) => {
   
   if (watch('password') != val) {
       setConfirmerr("not same")
       return false
   }
 },
})}
placeholder="confirm password"/>
</div>

<div className="row rowerr"><p className='col-12 err'>{errors.confirm_password && confirmerr}</p></div>
<div className="row mt-3 justify-content-center"><p style={{color:'red'}}>{errorfromdata?errorfromdata:""}</p></div>
     <div className="row mt-3 justify-content-center"><input className='col-6' type="submit" value="Submit" /></div>
   </form>
       </div>
  )
}

export default Resetpassword