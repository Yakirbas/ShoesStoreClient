import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';


 const UserContext = createContext()


 export const UserContextf = ({children}) => {
const [user,setUser] = useState()
const [login,setLogin] = useState()
const [cookies, setCookie, removeCookie] = useCookies([import.meta.env.VITE_COOKIE_TOKEN]);
const [cookieexist,setCookieexsit]= useState()
const [userBag,setUserBag] = useState([])
const [totalBag,setTotalBag] = useState(0)
const [purchaseHistory,setPurchaseHistory] = useState([])
const [isOpen, setOpen] = React.useState(
    JSON.parse(localStorage.getItem('is-open')) || [])
const nav=useNavigate()


useEffect(()=>{
console.log(isOpen)
},[isOpen])

useEffect(()=>{

    checkcookie()
  
},[cookies])


useEffect(()=>{
    if(user){
        allbag()
        getPurchaseHistory()
        console.log(user)
    }

},[user])

useEffect(()=>{
console.log("totalBag",totalBag)
},[totalBag])

const checkcookie = () =>{
    if(Object.keys(cookies).length>0){

        checkiftokenexist()
       
    }
    else{

        if(cookieexist == undefined){
            setLogin(undefined)
        }
        else{
            setLogin(false)
        }
        
    }
}




const checkiftokenexist =async ()=>{
   
    try{
        let res = await axios.post(`${import.meta.env.VITE_SERVER}/user/checktoken`,cookies)
        
  
        if(res.data){
            setUser(res.data)
            setLogin(true)
            setCookieexsit(true)
        
        }
        
           }catch(err){
            setLogin(false)
            setCookieexsit(false)
            
           }
}

const allbag =async ()=>{
    try{
        let res = await axios.post(`${import.meta.env.VITE_SERVER}/user/allbag`,user) 
        setUserBag(res.data)
        
    }catch(err){
        console.log(err)
    }
}

const checkifexist =async ()=>{
    try{
        let response = await axios.post(`${import.meta.env.VITE_SERVER}/user/exist`,user)
    let data2 = await response.data
    console.log(data2)
     setLogin(true)
    }catch(err){
        setLogin(false)
        console.log(err)
    }
}


const addtobag =async (pack) =>{

    try{
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/user/addtobag`,{pack:pack,cookies:cookies},{withCredentials:true})
       allbag()
       
      }catch(err){
        console.log(err)
        
      }

}

const removeshoefrombag =async (item)=>{
    let newobj = {item:item,user:user}
    try{
        let res = await axios.post(`${import.meta.env.VITE_SERVER}/user/removefrombag`,newobj)
        allbag()
        console.log(res.data)
        
           }catch(err){
            console.log(err)
           }
          }


          const getPurchaseHistory =async () =>{
try{
    let response = await axios.post(`${import.meta.env.VITE_SERVER}/user/mypurchase`,user,{withCredentials:true})
  let data = await response.data
  let tempdata = []
for (let index = 0; index < data.length; index++) {
    response = await axios.post(`${import.meta.env.VITE_SERVER}/user/mypurchase2`,data[index],{withCredentials:true})
    tempdata[index]=response.data
}
setPurchaseHistory(tempdata)
}
catch(err){
    console.log(err)
}
          }

          const logout =async ()=>{
           try{
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/user/logout`)
            if(response.data == "User has been logged out"){
                console.log(response.data)
                setUser(undefined)
                setLogin(undefined)
                setUserBag([])
                setPurchaseHistory([])
                setTotalBag([])
                setCookieexsit(false)
                nav("/")
            }
           }catch(err){
            (console.log(err))
          }
        }

        const addtostorge = (obj)=>{
            if(Array.isArray(obj)){
                localStorage.setItem('is-open', JSON.stringify(obj))
                setOpen(obj)
                return
            }
let arrtemp=[]
if(isOpen.length>0){
    arrtemp=[...isOpen,obj]
    localStorage.setItem('is-open', JSON.stringify(arrtemp))
    setOpen(arrtemp)
}
else{
    localStorage.setItem('is-open', JSON.stringify([obj]))
    setOpen([obj])
}

        }

    return (
        <UserContext.Provider value={{login,removeCookie,cookies,user,setUser,addtobag,userBag,allbag,setTotalBag,totalBag,removeshoefrombag,getPurchaseHistory,purchaseHistory,logout,addtostorge,isOpen}}>
            {children}
        </UserContext.Provider>
      )
    }
    
    export  function useUserContext(){
        return useContext(UserContext)
    }