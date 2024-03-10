import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'



 const MyContext = createContext()



export const Mycontextf = ({children}) => {
  const [testData,setTestData] = useState(false)
  const [testData2,setTestData2] = useState(false)
    const [colors,setColors] = useState()
    const [sizes,setSizes] = useState()
    const [styles,setStyles] = useState()
    const [companies,setCompanies] = useState()
    const [shoesmodel,setShoesmodels] = useState([])
    const [shoescolors,setShoescolors] = useState()
    const [shoescolorssizes,setShoescolorssizes] = useState()
    const [cards,setCards] = useState([])
    const [sizeexist,setSizeexist] = useState([])
 
   
   //לפני הצגת הצבעים יש צורך להזין לשינוי כי בהתחלה זה undfine
   useEffect(()=>{
    
    if(shoescolorssizes){
      setTestData(true)

   }

  },[shoescolorssizes])


  useEffect(()=>{
    
    if(companies){
      console.log(true)
      setTestData2(true)
    

   }

  },[companies])

  const createCard = (getarr) =>{
    
    let arr = []
    let arr2 = []
    let temp = 0
for (let index = 0; index < getarr.length;index++) {
  
temp++

if(getarr[index]){

  if(temp<=3){
arr2.push(getarr[index])

if(index+1 == getarr.length){
arr.push(arr2)
}

  }
  else{
    arr.push(arr2)
    temp = 1
    arr2 = [getarr[index]]
    if(index+1 == getarr.length){
      arr.push(arr2)
      }
  }


}

}

setCards(arr)
  }

const doApi = async() =>{

try{
  let response4 = await axios.get(import.meta.env.VITE_SERVER+`/items/allgroupby`)
     let data4 = await response4.data
      setShoesmodels(data4) 
}
catch(err){
console.log(err)
}


    try{
      let response5 = await axios.get(import.meta.env.VITE_SERVER+`/items/allshoescolors`)
      let data5 = await response5.data
       setShoescolors(data5)
    }catch(err){console.log(err)}

try{
  let response6 = await axios.get(`${import.meta.env.VITE_SERVER}/items/allsize`)
  let data6 = await response6.data
  setSizeexist(data6) 
}catch(err){console.log(err)}
    

try{
  let response7 = await axios.get(`${import.meta.env.VITE_SERVER}/items/allshoescolorssize`)
  let data7 = await response7.data
   setShoescolorssizes(data7) 
}catch(err){console.log(err)}
 
    
}


const doApifirst = async()=>{
  let response = await axios.get(`${import.meta.env.VITE_SERVER}/items/colors`)
  let data = await response.data
   setColors(data)

   let response1 = await axios.get(`${import.meta.env.VITE_SERVER}/items/sizes`)
   let data1 = await response1.data
    setSizes(data1)

   let response2 = await axios.get(`${import.meta.env.VITE_SERVER}/items/styles`)
   let data2 = await response2.data
    setStyles(data2)


   let response3 = await axios.get(`${import.meta.env.VITE_SERVER}/items/companies`)
   let data3 = await response3.data
    setCompanies(data3) 
}

  return (
    <MyContext.Provider value={{colors,sizes,styles,companies,doApi,doApifirst,testData,shoesmodel,shoescolors,shoescolorssizes,cards,createCard,sizeexist,testData2}}>
        {children}
    </MyContext.Provider>
  )
}

export function usemycontext(){
    return useContext(MyContext)
}