import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import './ForgetPassword.css'
const ForgetPassword = () => {

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
              const res = await axios.post(`${import.meta.env.VITE_SERVER}/user/forgetpass`,obj,{withCredentials:true})
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

    <div className="container d-flex justify-content-center"><h1>Forget Password</h1></div>
    
    <form className='container' onSubmit={handleSubmit((data) => submit(data))}>
  
    <div className="row mt-3"><input className='col-12' {...register('email',{pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ , required: true })} placeholder="email"/></div>
    <div className="row rowerr"><p className='col-12 err'>{errors.email && "email is required."}</p></div>
    <div className="row mt-3 justify-content-center"><input className='col-6' type="submit" value="Submit" /></div>
    </form>
       </div>
  )
}

export default ForgetPassword