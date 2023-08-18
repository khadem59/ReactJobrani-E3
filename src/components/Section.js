import React from 'react'
import Chair from './Chair'

const ASection = ({data,clickHandler,sectionStyle}) => {
    return ( 
        <div className={sectionStyle}>
        {
           data.map((chair) => (
               <Chair
                   key={chair.number}
                   number={chair.number}
                   price={chair.price}
                   state={chair.state}
                   clickHandler={clickHandler}
               />
           ))
       }
    </div>
        
    )
}

export default ASection