import React from 'react'
import './Card.css'
import Card from './Card'
import { usemycontext } from '../../../contexts/itemsContext';
const Cardthree = ({cardthree}) => {
  const contextitem = usemycontext();
  
  return (
    contextitem.testData?
<div className="card_main ms-3 ms-xl-0 row  mt-5 justify-content-around">
{cardthree.map((card,index) =>(<Card key={index} card={card}/>))}
</div>
: <h1>Loading.....</h1>
  )
}

export default Cardthree