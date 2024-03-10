import React, { useEffect, useRef, useState } from 'react'
import './AddShoes.css'
import { usemycontext } from '../../contexts/itemsContext';
import axios from 'axios';
import { storage } from '../../firebase_connection/firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useUserContext } from '../../contexts/userContext.jsx';
import { useNavigate } from 'react-router-dom';
const AddShoes = () => {
  const usercontext = useUserContext()
    const contextitem = usemycontext();
    const nav=useNavigate()
    const [imagesid,setImagesid] = useState([])
    const [testdata,setTestdata] =useState(false)
    const [access,setAccess]=useState(false)
const colorref = useRef([])
const sizeref = useRef([])
const quantityref = useRef([])
const priceref = useRef([])
const imageref = useRef([])
const modleref = useRef()
const companyref = useRef()
const genderref = useRef()
const styleref = useRef()
const desceref = useRef()


    /* {colors,sizes,styles,companies,doApi,testData} */

    useEffect(()=>{
      
      setTestdata(contextitem.testData2)

    if(contextitem.testData2 == true){
      console.log("here")
      let arr = new Array(contextitem.colors.length)

      for (let index = 0; index < arr.length; index++) {
        arr[index] = new Array(4)
        setImagesid(arr)
      }
    }

    },[contextitem.testData2])

    useEffect(()=>{
      if(usercontext.user){
       
        checkuser()
      }else{
        setAccess(false)
       
      }
     
    },[usercontext.user])


    const addRef = (el)=>{
      if(el && !colorref.current.includes(el)){
        colorref.current.push(el)
      }
      
    }

    const addSizeRef = (el)=>{
      if(el && !sizeref.current.includes(el)){
        sizeref.current.push(el)
      }
      
    }

    const addquanriryRef = (el)=>{
      if(el && !quantityref.current.includes(el)){
        quantityref.current.push(el)
      }
      
    }

    const addpricRef = (el)=>{
      if(el && !priceref.current.includes(el)){
        priceref.current.push(el)
      }
      
    }

    const addimageRef = (el)=>{
      if(el && !imageref.current.includes(el)){
        imageref.current.push(el)
      }
      
    }
    
    const checkuser = async ()=>{
      if(usercontext.user){
        const obj={cookies:usercontext.cookies,user:usercontext.user}
   
         let res = await axios.post(`${import.meta.env.VITE_SERVER}/user/checkM`,obj) 
        
if(import.meta.env.VITE_MESSAGE==res.data){
  setAccess(true)
}
else{
  setAccess(false)
  nav("/")
}
    
      }
 
     
    }
   


    const submit =async ()=>{

      let colorSizeArr = []
 
let index = 0
   for (let i = 0; i < contextitem.colors.length; i++) {
    
    if(!colorref.current[i].checked){
      index = index + contextitem.sizes.length
      continue
    }

    let obj = {colorid:"",price:"",url:"",sizearray:[],imagefirebasid:""}

    obj.colorid=colorref.current[i].value
    obj.price=priceref.current[i].value
    obj.url=imageref.current[i].value
    let randomString = '';
    let lettersAndDigits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * lettersAndDigits.length);
      randomString += lettersAndDigits.charAt(randomIndex);
    }
obj.imagefirebasid = randomString

/* פונקציה לעדכון פיירבייס חברה מודל גנדר וצבע */
for (let firebaseindex = 0; firebaseindex < 4; firebaseindex++) {
 let filefromfirebasearr = imagesid[i][firebaseindex]
 console.log(filefromfirebasearr)
try{
  uplaodfiles(filefromfirebasearr,companyref.current.value,modleref.current.value,obj.imagefirebasid,firebaseindex)
  console.log('done')
}catch(err){
  console.log(err)
  return
}
  
}

let sizearr= []
   for (let j = index; j < index+contextitem.sizes.length&&index+contextitem.sizes.length<= sizeref.current.length ; j++) {
    if(sizeref.current[j].checked){
      let sizeprice = [sizeref.current[j].value,quantityref.current[j].value]
      
      sizearr.push(sizeprice)
    }
   
    
   }
   obj.sizearray=sizearr
    index = index+contextitem.sizes.length
    colorSizeArr.push(obj)
   }

let tempobj = {
  modle:modleref.current.value,
  company:companyref.current.value,
  gender:genderref.current.value,
  style:styleref.current.value,
  description:desceref.current.value,
  colorSize:colorSizeArr
}
console.log(tempobj,tempobj.colorSize)

   try{
let res = await axios.post(`${import.meta.env.VITE_SERVER}/items/addshoes`,tempobj)

console.log(res.data)

   }catch(err){
    console.log(err)
   }
 
    }


    const test = (e)=>{
      e.preventDefault()
      console.log( e.target.files[0])
    }
/* להעביר תמונה תמונה לפיירבייס */
    const enterimage = (e,index,num) =>{
      e.preventDefault()
      let arr = [...imagesid]
      arr[index][num] =  e.target.files[0]
      setImagesid(arr)
    }

    /* העלאת קבצים לפייר בייס */
    const uplaodfiles = (file,company,model,id,num) =>{

      if(!file) return 
      const storagrRef = ref(storage,`/shoesstore/${company}/${model}/${id}/${num}`)
      const uplaodTask = uploadBytesResumable(storagrRef,file)
    
     /*  uplaodTask.on("state_changed", (snapshot)=>{
        const prog =Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    
      setProgress(prog)
      }, (err)=> console.log(err),
      ()=>{
        getDownloadURL(uplaodTask.snapshot.ref)
        .then(url => console.log(url))
      })
     */
    }
    


  return (
 <>
 {
access&&testdata?  <div className='container border'>

<h1 className='text-center mt-5'>Add Shoes</h1>


{/* //הכנסת מודל */}
<div className="row">
<div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">model</span>
  <input ref={modleref} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
</div>
</div>


{/* תיאור מוצר */}
<div className="row">
<div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">discription</span>
  <input ref={desceref} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
</div>
</div>


{/* בחירת חברה */}
<div className="row mt-3">
<select ref={companyref} className="form-select" aria-label="Default select example">
  <option value={0}>select Compnay</option>
  {contextitem.companies?.map((company,index) =>(
    <option key={index} value={company.cCompanyID}>{company.cCompany}</option>
  ))}
</select>
</div>


{/* בחירת מגדר */}

<div className="row mt-3">
<select ref={genderref} className="form-select" aria-label="Default select example">
  <option value={'n'}>select Gender</option>
  <option value={'m'}>man</option>
  <option value={'w'}>women</option>
</select>
</div>



{/* בחירת סגנון */}
<div className="row mt-3">
<select ref={styleref} className="form-select" aria-label="Default select example">
  <option value={0}>select Style</option>
  {contextitem.styles?.map((style,index) =>(
    <option key={index} value={style.sStyleID}>{style.sStyle}</option>
  ))}
</select>
</div>

{/* בחירת צבע */}
<div className="row mt-3">
<h1>ADD COLORS</h1>
<div className="form-check">
{
contextitem.colors?.map((color,index) =>(
<div key={index} className="container mt-5 ">
  <div className="row border">
    <div className="col-6">
    <input  ref={addRef} className="form-check-input" type="checkbox" value={color.cColorID} id="flexCheckDefault"/>
  <label className="form-check-label"  style={{backgroundColor: `${color.cColor.toLowerCase()}`}}>
    {color.cColor.toUpperCase()}
  </label>
</div>
{/* הכנסת מחיר */}
<div className="row col-6">
  <div className="row col-6">
    <div className="col-6">price:</div>
    <div className="col-6"><input className='col-12' ref={addpricRef} type='number'></input></div>
  </div>
  <div className="row col-6">
  <div className="col-6">image url:</div>
    <div className="col-6"><input className='col-12' ref={addimageRef} type='text'></input></div>
  </div>


</div>
    </div>
    
<div className="container mt-3">
  <div className="row">
 
    <div className="col-3"><input type="file" onChange={(e)=>{enterimage(e,index,0)}} /></div>
    <div className="col-3"><input type="file" onChange={(e)=>{enterimage(e,index,1)}} /></div>
    <div className="col-3"><input type="file" onChange={(e)=>{enterimage(e,index,2)}} /></div>
    <div className="col-3"><input type="file" onChange={(e)=>{enterimage(e,index,3)}} /></div>
  </div>
</div>

    {/* בחירת מידה */}
    
          <div className="row mt-3">
            <h1>ADD SIZES</h1>
          <div className="form-check">
            <div className="row">
          {
          contextitem.sizes?.map((size,index) =>(
          <div key={index} className="container mt-3 col-2">
            <div className="row border">
              <div className="col-3">
              <input   ref={addSizeRef} className="form-check-input col-6" type="checkbox" value={size.sSizeID} id="flexCheckDefault"/>
            <label className="form-check-label col-6">
              {size.sSize}
            </label>
          </div>
          <div className="col-9">
            {/* כמות יחידות */}
            <input className='col-12' ref={addquanriryRef} type="number"  min={0}/>
          </div>
              </div>
              
         
          
            </div>
          
            
          ))
          
          }
          </div>
           </div>
          
          
          
          </div>

{/* סוף בחירת מידה */}

  </div>

  
))

}
 </div>
</div>



<div className="row mt-3">
<button onClick={submit}>Submit</button>
<form onSubmit={test}>

<input type="file" className='input' />
<button type='submit'>Uplaod</button>

</form>
</div>
    </div>

    :

    <div>Loading.....</div>

 }
 
 </>
  )
}

export default AddShoes