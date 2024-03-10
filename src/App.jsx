import { useEffect, useState } from 'react'
import './App.css'

import Routerpro from './comps/router/Routerpro'
import { usemycontext } from './contexts/itemsContext';
import { useUserContext } from './contexts/userContext';
import { useNavigate } from 'react-router-dom';


function App() {
  const contextitem = usemycontext();
  const usercontext = useUserContext()
  const navigate= useNavigate()
  const [change,setChange]= useState(true)
  useEffect(()=>{
console.log(usercontext.cookies)
setChange(!change)
  },[usercontext.cookies])


  useEffect(()=>{
    console.log(usercontext.login)
    if(usercontext.login==undefined){
      contextitem.doApifirst()
    }
    else{
if(usercontext.login){
  contextitem.doApifirst()
}
else{
  navigate("/login")
}
    }

   
    
},[usercontext.login])



  return (
    usercontext.cookies?
<div> 
  <Routerpro/>
</div>:
<div> 
  <Routerpro/>
</div>
    
  )
}

export default App
