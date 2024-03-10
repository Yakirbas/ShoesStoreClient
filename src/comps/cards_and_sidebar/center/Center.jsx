import React, { useEffect } from 'react'
import HeaderFil from '../headerfil/HeaderFil'
import Sidebar from '../sidebar/Sidebar'
import './Center.css'
import useScreenType from "react-screentype-hook";
import { useState } from 'react'
import { usemycontext } from '../../../contexts/itemsContext'
import Cardthree from '../card/Cardthree'
const Center = () => {
  
  const contextitem = usemycontext();
  
  const [hidefilter,setHidefilter]=useState(false)
  
  /*גודל מסך */
  const screenType = useScreenType({
    mobile: 575.98,
    tablet: 767.98,
    desktop: 991.98,
    largeDesktop: 1199.98,
  });




  return (
    contextitem.testData?
    <div className="container-fluid mt-5 ">

        <div className="row sticky-top bg-body "><HeaderFil Hidefilter={{hidefilter,setHidefilter}}/></div>
        <div className="row">
        <div className="Center container-fluid d-flex justify-content-around">
   
 { (screenType.isDesktop || screenType.isLargeDesktop) && hidefilter  ?  
 <><div className="row col-2 left " style={{display: 'none'}}><Sidebar/></div>
 <div className="row  col-12 right ">
 
 {contextitem?.cards?.map((cardthree,index) =>(
<Cardthree key={index} cardthree={cardthree}/>
 ))}
 </div> </>

 :<></>
}


{(screenType.isDesktop || screenType.isLargeDesktop) && !hidefilter?
  <> <div className="row col-3 col-xxl-2 left  "><Sidebar/></div>

   
<div className="row  col-9 col-xxl-10 right ">
{contextitem?.cards?.map((cardthree,index) =>(
<Cardthree key={index} cardthree={cardthree}/>
 ))}
 
  </div></>
:<></>
}
 
{(screenType.isMobile || screenType.isTablet) && !hidefilter  ? 
<div className="container">
 <div className="row col-12 left"><Sidebar/></div>
<div className="row  col-12 right ">{contextitem?.cards?.map(cardthree =>(
<Cardthree cardthree={cardthree}/>
 ))}
 </div>
</div>
:<></>
}
{(screenType.isMobile || screenType.isTablet) && hidefilter  ? 
<div className="container">
 <div className="row col-12 left" style={{display: 'none'}}><Sidebar/></div>
<div className="row  col-12 right ">{contextitem?.cards?.map(cardthree =>(
<Cardthree cardthree={cardthree}/>
 ))}
 </div>
</div>
:<></>
}




   </div>
        </div>
    </div>
    :
    <h1>Loading....</h1>
 
  )
}

export default Center