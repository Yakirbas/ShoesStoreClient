import React, { useEffect } from 'react'
import './Card.css'
import { usemycontext } from '../../../contexts/itemsContext';
import { Link } from 'react-router-dom';
const Card = ({card}) => {

    const contextitem = usemycontext();
    const colorCount= card['count(cColor)']
console.log(card)

  return (
    contextitem.testData? 
    
    <div className="card col-12  col-lg-3 border">
      <Link to={`/shoe/${card.pProductID?card.pProductID:card.productid}/${card.scColorID?card.scColorID:card.idcolorforsize}`}>
<img className='card_image col-12' src={card.scImage?card.scImage:card.mainpic} alt="" />
<p className='fw-bold'>{card.pModel}</p>
{card.pGender == 'm'?<p className='fw-normal'>Men's Shoes</p> : <p className='fw-normal'>Women's Shoes</p>}

<p className='fw-normal'>{colorCount} Colour</p>
<p className='fw-bold fs-5'>₪{card.price}</p>
</Link>
</div>

: <h1>Loading....</h1>
  )
}

export default Card