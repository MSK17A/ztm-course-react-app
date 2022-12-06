import React from "react";
import './SignIn.css'

const SignIn = ({ onRouteChange }) => {
    return (
        <div>
            <form autoComplete='on' className='form'>
                <div className='control'>
                    <h1>
                        Sign In
                    </h1>
                </div>
                <div className='control block-cube block-input'>
                    <input name='username' placeholder='Username' type='text' />
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                </div>
                <div className='control block-cube block-input'>
                    <input name='password' placeholder='Password' type='password' />
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                </div>
                <button
                    onClick={() => onRouteChange("Home")}
                    className='btn block-cube block-cube-hover'
                    type='button'>
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='text'>
                        {"Log In"}
                    </div>
                </button>
            </form>

        </div>
    )
}

export default SignIn;