import React, { useRef } from 'react'
import './Login.css'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  
 const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm();
    const nagivate= useNavigate()

        const loginsubmit = async(obj) =>{
          
try{
  const response = await axios.post(`${import.meta.env.VITE_SERVER}/user/login`,obj, {withCredentials:true})
  const data = await response.data
  nagivate("/")
}catch(err){
  console.log(err)
}
 
        }
    return (
    <div className='login container-fluid mt-2'>
      <div className="container d-flex justify-content-center"><h1>Login</h1></div>

<form className='container' onSubmit={handleSubmit((data) => loginsubmit(data))}>
  <div className="row  mt-3"> <input className='col-12' {...register('email',{pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ , required: true })} placeholder="email"/></div>
  <div className="row rowerr"><p className='col-12 err'> {errors.email && "email is required."}</p></div>
      <div className="row  mt-3"> <input className='col-12 ' type={"password"} {...register('password', { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ , required: true })} placeholder="password"/></div>
      <div className="row rowerr"><p className='col-12 err'> {errors.password && "Please enter legel password"}</p></div>
      <div className="row mt-5 justify-content-center"><input className='col-6' type="submit" value="Submit"/></div>
      
    </form>

    <div className='container-fluid mt-5'><div className="row"><Link to="/forget"><h6 className='text-end text-secondary' >Forget password?</h6></Link></div></div>
    </div>
  )
}

export default Login