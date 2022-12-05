import React from "react";

const Navigation = ({ onRouteChange, isSigned }) => {

    if (isSigned === true) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '24px' }}>
                <p
                    onClick={() => onRouteChange('SignedOut')}
                    className='f3 link dim black pa3 pointer'>
                    {"Sign Out"}
                </p>

            </nav>
        )
    }

    else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '24px' }}>
                <p
                    onClick={() => onRouteChange('SignedOut')}
                    className='f3 link dim black pa3 pointer'>
                    {"Sign In"}

                </p>

                <p
                    onClick={() => onRouteChange('Register')}
                    className='f3 link dim black pa3 pointer'>
                    {"Register"}

                </p>

            </nav>
        )
    }
}

export default Navigation;