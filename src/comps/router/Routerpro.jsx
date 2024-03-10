import React, { useEffect } from 'react'
import { Routes, Route} from 'react-router-dom';
import Navbar from '../menu/Navbar';
import Footer from '../footer/Footer';
import AddShoes from '../addShoes/AddShoes';
import Itemrouter from './Itemrouter';
import LandR from '../LandR';

import CancelPage from '../paypal/CancelPage/CancelPage';
import SuccessPage from '../paypal/success/SuccessPage';
import ForgetPassword from '../login/Forget_password/ForgetPassword';
import Resetpassword from '../login/Reset_Password/Resetpassword';
import Favourites from '../favourites/Favourites';


const Routerpro = () => {


 

  return (
   
<>
      <Navbar/>
    <Routes>
 <Route path='*' element={<Itemrouter/>}/>
 <Route path='/add' element={<AddShoes/>}/>
 <Route path="/success" element={<SuccessPage/>} />
 <Route path="/cancel" element={<CancelPage/>} />
 <Route path="/myfavorite" element={<Favourites/>} />
 <Route path='*/mypurchase' element={<Itemrouter/>}/>
 <Route path='*/mycart' element={<Itemrouter/>}>
  </Route>
  <Route path='*/shoe'>
 <Route path='*/:shoeid' element={<Itemrouter/>} />
 <Route path='*/:shoeid/:colorid/' element={<Itemrouter/>} />
 
 </Route> 
 <Route path='/login' element={<LandR/>}/>
 <Route path='/forget' element={<ForgetPassword/>}/>
 <Route path='/reset-password/:id/:token' element={<Resetpassword/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default Routerpro


