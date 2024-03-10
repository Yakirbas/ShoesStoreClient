import React, { useEffect, useState } from 'react'
import { storage } from '../../firebase_connection/firebase.js'
import { getDownloadURL, getStorage, listAll, ref, uploadBytesResumable } from 'firebase/storage'
import { usemycontext } from '../../contexts/itemsContext.jsx'
import { useParams } from 'react-router-dom';

import Shoe from '../shoe/Shoe.jsx'




const Firebasedata = () => {
  const contextitem = usemycontext();
    const [picarr,setPicarr] = useState([])
    const [allcolors,setAllcolors] = useState([])
    const [allsizes,setAllsizes] = useState([])
    const [shoeobj,setShoeobj] = useState({})
    const {shoeid,colorid} = useParams() 
    
   
    let temparr = []
     
    useEffect(()=>{
      getshoedata()
       
    },[shoeid])

    useEffect(()=>{
      if(shoeobj){
        listpic()
      }
    },[shoeobj])

    useEffect(()=>{
if(picarr.length==0){
  listpic()
}
    },[picarr])

    const getshoedata = (getarr) =>{
      let color =''
       if(getarr){
        color = getarr[0].scColorID==colorid?colorid:getarr[0].scColorID
       }
       else{
        color = colorid
       }
      let arr = []
      let arr2 = []
     
      arr = contextitem.shoescolors.filter(shoe => shoe.pProductID==shoeid)
      arr2=  contextitem.shoescolorssizes.filter(shoe => shoe.pProductID==shoeid)
     
      
     setAllcolors(arr)
     setAllsizes(arr2)

     if(getarr){
      arr=arr.filter(shoe =>shoe.idcolorforsize==getarr[0].idcolorforsize)
     }
     if(color){
      let temparr = arr.filter(shoe => shoe.scColorID==color)
      let obj = {}
      obj.productid=temparr[0].pProductID
      obj.description=temparr[0].description
      obj.modle=temparr[0].pModel
obj.firbaseid=temparr[0].firebasimageid
obj.cCompanyID=temparr[0].cCompanyID
obj.mainpic=temparr[0].scImage
obj.idcolorforsize=temparr[0].idcolorforsize
obj.price=temparr[0].price
obj.gender=temparr[0].pGender

setShoeobj(obj)

     }
     else{

      let obj = {}
      obj.productid=arr[0].pProductID
      obj.description=arr[0].description
      obj.modle=arr[0].pModel
obj.firbaseid=arr[0].firebasimageid
obj.cCompanyID=arr[0].cCompanyID
obj.mainpic=arr[0].scImage
obj.idcolorforsize=arr[0].idcolorforsize
obj.price=arr[0].price
obj.gender=arr[0].pGender
setShoeobj(obj)

     }
  }

///קבלת תמונות מהדאטה בייס
const listpic = (obj) =>{
  let tempobj = obj? obj:shoeobj
    listAll(ref(storage, `shoesstore/${tempobj.cCompanyID}/${tempobj.modle}/${tempobj.firbaseid}`))
    .then((url) => {

  

      // Or inserted into an <img> element

   return url.items
     

}).then(items =>{
   temparr = new Array (items.length)
items.map((item,index)=>{
 
  getDownloadURL(ref(storage, item.fullPath)).then(data =>{
    temparr[index]=data
    
  })
})
return temparr
}).then(arr =>{
  setPicarr(arr)
  setTimeout(()=>{
   
  },1500)/*  במידת הצורך להגדיל */
 
})
    .catch((error) => {
      // Handle any errors
      console.log(error)
    });
}


  return (
    picarr.length>0 ?
<Shoe picarr={picarr} allcolors={allcolors} allsizes={allsizes} shoeobj={shoeobj} getshoedata={getshoedata}/>
:<>Loading</>
    
  )
}

export default Firebasedata