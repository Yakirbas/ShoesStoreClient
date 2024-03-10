import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import {usemycontext} from './itemsContext'

 const MyFilterContext = createContext()



export const MyFilterContextf = ({children}) => {
    const contextitem = usemycontext();
    const [changeshoescolors,setChangeshoescolors] = useState([])
    const [allsizesshoes,setAllsizesshoes] = useState([])
    const [genderfilt,setGenderfilt] = useState('a')
    const [pricefilt,setPricefilt] = useState(16)
    const [colorfilt,setColorfilt] = useState('Multi-Color1')
    const [sizefilt,setSizefilt] = useState(1)
    useEffect(()=>{
        if(contextitem.testData == true){
            
setChangeshoescolors(contextitem.shoesmodel)
setAllsizesshoes(contextitem.shoescolorssizes)
}
    },[contextitem.testData])



useEffect(()=>{
     contextitem.createCard(changeshoescolors) 
   
},[changeshoescolors])


useEffect(()=>{
    
    let arr = (colorfilt == 'Multi-Color1'|| colorfilt == 'Multi-Color') && sizefilt == 1 && pricefilt == 16 ? contextitem.shoesmodel : contextitem.shoescolors
    arr = genderfilt == 'a' || genderfilt == 'all' ? arr : ganderfilter(genderfilt ,arr)
   arr = pricefilt == 1? arr : priceFilter(pricefilt,arr)
   arr = colorfilt == 'Multi-Color1' || colorfilt == 'Multi-Color'? arr : colorfilter(colorfilt,arr)
   arr = sizefilt == 1 ? arr : sizefilter(sizefilt,arr)
   setChangeshoescolors(arr)
},[genderfilt,pricefilt,colorfilt,sizefilt])


const ganderfilter = (g,arrt) =>{
    let arr = [...arrt]

     if(g == 'm'){
arr = arr.filter(item => item.pGender == g)

    }
    else if(g == 'w'){
        arr = arr.filter(item => item.pGender == g)
    }
    return arr

}

const priceFilter = (num,arrt) =>{
let arr = [...arrt]
    switch(num){

        case 1:
            return arr
            
            case 2: arr = arr.filter(n => n.price <= 519.9 || n.price > 709.9)
            return arr
             
                
            case 3: arr = arr.filter(n => n.price < 259.9 || n.price >= 519.9)
             return arr

            case 4: arr = arr.filter(n => n.price < 709.9)
            return arr
            
            case 5: arr = arr.filter(n => n.price >=259.9)
            return arr
            
            case 6: arr = arr.filter(n => n.price < 259.9 || n.price >= 709.9)
           return arr

            case 7: arr = arr.filter(n => n.price < 519.9)
            return arr

            case 8:arr = arr.filter(n => n.price < 259.9 || (n.price >= 519.9 && n.price < 709.9))
            return arr

            case 9:arr = arr.filter(n => n.price >= 709.9 || (n.price >= 259.9 && n.price < 519.9))
            return arr

            case 10:arr = arr.filter(n => n.price >= 519.9)
            return arr

            case 11: arr = arr.filter(n => n.price >= 259.9 && n.price < 709.9)
            return arr

            case 12: arr = arr.filter(n => n.price < 259.9)
            return arr

            case 13:arr = arr.filter(n => n.price >= 709.9)
            return arr

            case 14:arr = arr.filter(n => n.price >= 259.9 && n.price < 519.9)
            return arr

            case 15:arr = arr.filter(n => n.price >= 519.9 && n.price < 709.9)
            return arr
            case 16:
                return arr
           

    }
}

const colorfilter =(colorname,arrt) =>{
let arr = [...arrt]
 arr = arr.filter(shoe => shoe.cColor == colorname)
return arr
}

const sizefilter = (size,arrt) =>{
    let arr = [...arrt]
    let sizesarr = [...allsizesshoes]
    sizesarr = sizesarr.filter(sizea => sizea.sSize == size)

    let temparr = []
    for (let i = 0; i < arr.length; i++) {
        for (let index = 0; index < sizesarr.length; index++) {
        
            if(arr[i].idcolorforsize == sizesarr[index].idcolorforsize){
                
                temparr.push(arr[i])
                break
            }
            
        } 
    }
    
    arr = temparr
    return arr
   
}

  return (
    <MyFilterContext.Provider value={{genderfilt,setGenderfilt,pricefilt,setPricefilt,setColorfilt,colorfilt,setSizefilt,sizefilt}}>
        {children}
    </MyFilterContext.Provider>
  )
}

export function usemyfiltercontext(){
    return useContext(MyFilterContext)
}