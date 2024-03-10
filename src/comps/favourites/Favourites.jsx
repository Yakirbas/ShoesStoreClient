import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../contexts/userContext'
import Card from '../cards_and_sidebar/card/Card'
import YouMightAlsoLike1 from '../shoe/YouMightAlsoLike/YouMightAlsoLike'


const Favourites = () => {
    const usercontext = useUserContext()
   


  return (
    usercontext.isOpen.length>0?
    <div className="container">
        <div className="row">{usercontext.isOpen.map(shoe=>(<Card card={shoe}/>))}</div>
    </div>
    :<div className='container-fluid m-5 '>
      <h1 className='text-center '>Please add shoes to favorites</h1>

      </div>
   
  )
}

export default Favourites