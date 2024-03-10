import React, { useEffect, useState } from 'react'
import './Shoe.css'
import useScreenType from "react-screentype-hook";
import { usemycontext } from '../../contexts/itemsContext';
import { useNavigate, useParams } from 'react-router-dom';
import Sizeshoe from './sizepershoe/Sizeshoe';
import YouMightAlsoLike1 from './YouMightAlsoLike/YouMightAlsoLike';
import { useUserContext } from '../../contexts/userContext';


const Shoe = ({picarr,allcolors,allsizes,shoeobj,getshoedata}) => {

    const handleDragStart = (e) => e.preventDefault();
    const usercontext = useUserContext()
   
    const mycontext = usemycontext()
    const [pics,setPics] = useState([])
const [shoeobjectthis,setShoeobjectthis]=useState(shoeobj)
   const [allsizesthis,setAllsizesthis] =useState(allsizes)
    const [changeimage,setChangeimage] = useState(`${shoeobj.mainpic}`)
    const [choosensize,setChoosensize] = useState(0)
const [youMightAlsoLike,setYouMightAlsoLike] = useState([])
const [items,setItems]= useState([])
const [isfav,setIsfav]=useState(false)

const navigator = useNavigate()

useEffect(()=>{
   if(usercontext.isOpen.length>0){
    for (let index = 0; index < usercontext.isOpen.length; index++) {
        console.log(usercontext.isOpen[index],shoeobjectthis)
        if(usercontext.isOpen[index].pProductID==shoeobjectthis.productid && usercontext.isOpen[index].idcolorforsize==shoeobjectthis.idcolorforsize){
            setIsfav(true)
            break
        }
        else{
            setIsfav(false)
        }
        
    }
   }
},[shoeobjectthis])

    useEffect(()=>{
let items1 = []
for (let index = 0; index < youMightAlsoLike.length; index++) {
    items1[index] = {img:<img className='col-12' src={youMightAlsoLike[index].scImage} onDragStart={handleDragStart} role="presentation" />,prod:youMightAlsoLike[index]}
    
}

setItems(items1)
    },[youMightAlsoLike])

    


    useEffect(()=>{
        loaddata()
    },[picarr])

    

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    const loaddata = ()=>{
        let numarr = [getRandomInt(mycontext.shoescolors.length)]
       for (let index = 1; index < 9; index++) {
        let num =getRandomInt(mycontext.shoescolors.length)
        for (let index2 = 0; index2 < index; index2++) {
            if(num == numarr[index2]){
                num =getRandomInt(mycontext.shoescolors.length)
                index2 = -1
                continue
            }
        }

        numarr[index] = num
       }
     let temparr = []

     for (let index = 0; index < numarr.length; index++) {
        temparr[index] = mycontext.shoescolors[numarr[index]]
        
     }

         setTimeout(()=>{
            setPics(picarr)
            setChangeimage(`${shoeobj.mainpic}`)
            setShoeobjectthis(shoeobj)
            setAllsizesthis(allsizes)
            setYouMightAlsoLike(temparr)
            setChoosensize(0)
         },1000)
        
    }

  

  /*גודל מסך */
  const screenType = useScreenType({
    mobile: 575.98,
    tablet: 767.98,
    desktop: 991.98,
    largeDesktop: 1199.98,
  });


const changepic = (pic)=>{
setChangeimage(pic)
}


const changeshoe = (color) =>{
    let arr =[color]
    getshoedata(arr)
    setChoosensize(0)
    
}

const addtobag = () =>{
    if(choosensize==0 ||usercontext.user == undefined ){
        alert("Please make sure you are logged in and that you have selected a size")
    }
    else{

if(usercontext.user&&choosensize>0){
    let newobj= {
        userid:usercontext.user.id,
        productid:shoeobjectthis.productid,
        idcolorforsize:shoeobjectthis.idcolorforsize,
        size:choosensize
        
    }
    usercontext.addtobag(newobj)
    navigator('/mycart/bag')

}
        //להמשיך פה להכניס למשתמש את הדאטה של הנעלים
    }


}

const addtofavorite = ()=>{
    let obj = {}
    let temparr=[]
    if(isfav){
let num = 0
for (let index = 0; index < usercontext.isOpen.length; index++) {

            if(usercontext.isOpen[index].pProductID==shoeobjectthis.productid && usercontext.isOpen[index].idcolorforsize==shoeobjectthis.idcolorforsize){
                setIsfav(false)
                num=1
               
            }
            else{
                temparr[index-num]=usercontext.isOpen[index]
            }
        
}
usercontext.addtostorge(temparr) 
    }
    else{
 
    for (let index = 0; index < allcolors.length; index++) {
       if(allcolors[index].idcolorforsize==shoeobjectthis.idcolorforsize && allcolors[index].pProductID==shoeobjectthis.productid){
        obj=allcolors[index]
       }
    }
    setIsfav(true)
    usercontext.addtostorge(obj) 
    }

    
}

  return (
    pics.length>0 && picarr.length>0?
    screenType.isMobile || screenType.isTablet ? 

    <div className='container-fluid mt-3 '> {/* תצוגת מובייל */}
      


<div className="row gap-5">
<div className="row gap-3">
<div className="shotitle ">
    <h2>{shoeobjectthis.modle}</h2>
    <h6>{shoeobjectthis.gender == 'm'? 'Men':'Women'}'s Shoes</h6>
</div>
<div className="pricesection ">
    <h5>₪{shoeobjectthis.price}</h5>
</div>
<div className="slidepic ">
    <img style={{width:'100%'}} src={changeimage} alt="" />
</div>


<div className='allcolors'>

    <div className="row">
        {allcolors.map((color,index) =>(<img onClick={()=>{changeshoe(color)}} key={index} className='col-2' src={color.scImage} />))}
    </div>
</div>


<div className="sizessection">
    <h5>Select size</h5>
{/* להכניס פה מידות קיימות */}
<Sizeshoe allsizes={allsizesthis} shoeobj={shoeobjectthis} setChoosensize={setChoosensize} choosensize={choosensize} />

</div>

<div className="row cartsection gap-3 justify-content-center  ms-2" >
<button style={{height:'55px'}} onClick={()=>{addtobag()}} type="button" className="btn btn-dark rounded-pill col-12">Add to Bag</button>
<button style={{height:'55px'}} onClick={()=>{addtofavorite()}} type="button" className="btn btn-light rounded-pill border">Favourite ♡</button>
</div>

<div className="description">
    <p className='fs-5'>{shoeobjectthis.description}</p>
</div>

</div>




<div className="row">
    <h4>You Might Also Like</h4>


    {items?.length>0?<YouMightAlsoLike1 items={items}/>:<>LOading...</>}

 
</div>
</div>


    </div>
      :
      <>
      <div className="container mt-4 ">{/* תצוגת מחשב */}
        


<div className="row gap-5">
<div className="row">
    <div className="row left ">
        <div className="col-6 row">
            <div className="selectimage col-2">
   {pics.map((pic,index) =>{
       return <img key={index}  onMouseOver={()=>{changepic(pic)}} onMouseLeave={()=>{changepic(`${shoeobjectthis.mainpic}`)}} style={{width:'100%'}} src={pic} alt="" />
    })} 
            </div>

            <div className="col-10">
                <img style={{width:'100%'}} src={changeimage} alt="" />
            </div>
        </div>

        <div className="col-6">
           <div className="row gap-3">
        <div className="shotitle ">
    <h2>{shoeobjectthis.modle}</h2>
    <h6>{shoeobjectthis.gender == 'm'? 'Men':'Women'}'s Shoes</h6>
</div>
<div className="pricesection ">
    <h5>₪{shoeobjectthis.price}</h5>
</div>

<div className='allcolors'>

    <div className="row">
        {allcolors.map((color,index) =>(<img onClick={()=>{changeshoe(color)}} key={index} className='col-2' src={color.scImage} />))}
    </div>
</div>

<div className="sizessection">
    <h5>Select size</h5>
{/* להכניס פה מידות קיימות */}
<Sizeshoe allsizes={allsizesthis} shoeobj={shoeobjectthis} setChoosensize={setChoosensize} />

</div>

<div className="row cartsection gap-3 justify-content-center  ms-2" >
<button style={{height:'55px'}} onClick={()=>{addtobag()}} type="button" className="btn btn-dark rounded-pill col-12">Add to Bag</button>
{isfav?<button style={{height:'55px'}} onClick={()=>{addtofavorite()}} type="button" className="btn btn-light rounded-pill border">Favourite 🧡</button>
:<button style={{height:'55px'}} onClick={()=>{addtofavorite()}} type="button" className="btn btn-light rounded-pill border">Favourite ♡</button>}

</div>

<div className="description">
    <p className='fs-5'>{shoeobjectthis.description}</p>
</div>

</div>

        </div>
    </div>
</div>


</div>


      </div>
      <div className="container-fluid">
      <div className="row">
      <h4>You Might Also Like</h4>
      
      {/* סלייד תמונות לפי חברה */}
      {items?.length>0?<YouMightAlsoLike1 items={items}/>:<>LOading...</>}
      
      </div>
      </div>
      </>
      :<div>Loading</div>
  )

}

export default Shoe