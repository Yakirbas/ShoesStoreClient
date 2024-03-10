import React, { useState } from 'react'
import './Register.css'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const nagv= useNavigate()
const [confirmerr,setConfirmerr] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
        
      } = useForm({mode:"onChange"});
      const [errorfromdata,setErrorfromdata] = useState()

      const submit =async (obj)=>{
        try{
          const res = await axios.post(`${import.meta.env.VITE_SERVER}/user/register`,obj,{withCredentials:true})
       
          if(res.status == 200){
            nagv("/")
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
    <div className='register container-fluid mt-2'>

<div className="container d-flex justify-content-center"><h1>Register</h1></div>

<form className='container'  onSubmit={handleSubmit((data) => submit(data))}>
<div className="row mt-2"><input className='col-12' {...register('name',{pattern: /^[a-z ,.'-]+$/i , required: true })} placeholder="first-name"/></div>
<div className="row rowerr"><p className='col-12 err'>{errors.name && "Only letters should be entered ."}</p></div>
<div className="row mt-3"><input className='col-12' {...register('email',{pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ , required: true })} placeholder="email"/></div>
<div className="row rowerr"><p className='col-12 err'>{errors.email && "email is required."}</p></div>
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

export default Register