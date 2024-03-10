import React, { useEffect } from 'react'
import { Routes, Route} from 'react-router-dom';
import Advertising from '../Advertising/Advertising';
import Center from '../cards_and_sidebar/center/Center';
import { usemycontext } from '../../contexts/itemsContext';
import { MyFilterContextf } from '../../contexts/filterContext';
import Firebasedata from '../get_firebase_data/Firebasedata';
import MyCart from '../MyCart/MyCart'
import PurchaseHistory from '../Purchase_history/PurchaseHistory';
const Itemrouter = () => {
    const contextitem = usemycontext();

  useEffect(()=>{
    contextitem.doApi()
  },[])


    return (
      contextitem.testData?
      <MyFilterContextf>
      <Routes>
   <Route path='/' element={<><Advertising/><Center/></>}/>


   <Route path='mycart'>
   <Route path=':bag' element={<MyCart/>}/>
   </Route>

   <Route path='mypurchase'>
   <Route path=':bag' element={<PurchaseHistory/>}/>
   </Route>
   
   <Route path='shoe'>
   <Route path=':shoeid' element={<Firebasedata/>} />
   <Route path=':shoeid/:colorid' element={<Firebasedata/>} />
  
   </Route>

        
      </Routes>
      </MyFilterContextf>:<>Loading.....</>
    )
  }
  


export default Itemrouter