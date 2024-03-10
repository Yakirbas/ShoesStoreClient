import React from 'react'
import { Link } from 'react-router-dom'
import { usemycontext } from '../../contexts/itemsContext'
import { useUserContext } from '../../contexts/userContext'
import {RiShoppingCartFill} from 'react-icons/ri';
const Navbar = () => {

  const mycontext = usemycontext()
  const usercontext = useUserContext()


  const logout = ()=>{
 
   usercontext.logout()
   usercontext.removeCookie(import.meta.env.VITE_COOKIE_TOKEN)

 
  }
  
  const popupm= ()=>{
    alert("Please Log In")
  }

  return (
    mycontext.companies?
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid ">
    <Link className="navbar-brand"  to={'/'}>Shoe's Store</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="">
          <Link className="nav-link active" aria-current="page"   to={'/'}>Home</Link>
        </li>



{usercontext.user?<>
<li className=""><Link to={"/mycart/bag"} className="nav-link">MyCart</Link></li>

<li className=""><Link to={"/mypurchase/bag"} className="nav-link">MyPurchase</Link></li>
<li className=""><Link to={"/myfavorite"} className="nav-link">MyFavorite</Link></li>
</>
:<>
<li className=""><div style={{cursor:"pointer"}} onClick={()=>{popupm()}} className="nav-link">MyCart</div></li>
<li className=""><div style={{cursor:"pointer"}} onClick={()=>{popupm()}} className="nav-link">MyPurchase</div></li>
<li className=""><Link to={"/myfavorite"} className="nav-link">MyFavorite</Link></li>
</>
}
        <li className="">
        {usercontext.login == undefined || usercontext.login == false? <Link  to={"/login"} className="nav-link">Login</Link>: <button type='button' className="nav-link " style={{borderRadius: '100%', background:'none'}}  onClick={()=>{logout()}}>Logout</button> }
        </li>
      </ul>
    </div>


  </div>
</nav>
:<>Loading</>
  )
}

export default Navbar