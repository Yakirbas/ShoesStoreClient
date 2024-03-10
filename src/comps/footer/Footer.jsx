import React from 'react'
import './Footer.css'
import { BsInstagram,BsFacebook,BsYoutube } from 'react-icons/bs';
import { AiOutlineTwitter } from 'react-icons/ai';
const Footer = () => {
  return (
    <div className='footer container-fluid bg-dark'>

<div className="footercontainer contianer gap-2">

    <div className="socialrow row ">
       <div className="contianer mt-5">
       <div className="row justify-content-around">
        <div className='icon d-flex justify-content-center align-items-center'><BsInstagram className='iconimage'/></div>
       <div className='icon d-flex justify-content-center align-items-center'><AiOutlineTwitter className='iconimage'/></div>
       <div className='icon d-flex justify-content-center align-items-center'><BsFacebook className='iconimage'/></div>
       <div className='icon d-flex justify-content-center align-items-center'><BsYoutube className='iconimage'/></div>
</div>
       </div>
    </div>
    <div className="row mt-5">
        <div className="col-6  text-center"><h6 className='text-secondary'>Made with ❤  Yakir Basteker</h6></div>
        <div className="col-6  text-center"><h6 className='text-secondary'>Phone: 0502501855</h6></div>
    </div>
</div>

    </div>
  )
}

export default Footer