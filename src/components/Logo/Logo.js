import React from "react";
import Brain from './Brain.jpg';

const Logo = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginRight: '24px' }}>
            <div className='f3 link dim black pa3 pointer'>
                <img alt='Logo' src={Brain}></img>
            </div>
        </div>
    )
}

export default Logo;