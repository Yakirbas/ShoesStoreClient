import React from 'react'
import './Sidebar.css'

import Gander from './filters/gander/Gander';
import Pricefilter from './filters/pricefilter/Pricefilter';
import Colors from './filters/colors/Colors';
import Sizesfilter from './filters/sizesfilter/Sizesfilter';

const Sidebar = () => {
  
  return (
  
       
<div className="sidebar border ms-3 ms-lg-0 ">
    <div className="sidebarcontainer container-fuild  mt-5 bg-body scrollspy-example" >
    <div className="sidebarcontainer-fluid container-fluid">

<Gander/>
<Pricefilter/>
<Colors/>
<Sizesfilter/>




    </div>
    </div>
</div>

   

  )
}

export default Sidebar