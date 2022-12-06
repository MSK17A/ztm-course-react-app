import React from "react";
import './Register.css'

const Register = ({ onRouteChange }) => {
    return (
        <div>
            <form autoComplete='on' className='form'>
                <div className='control'>
                    <h1>
                        Create an account!
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
                    <input name='email' placeholder='Email' type='text' />
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
                    onClick={() => onRouteChange("SignedOut")}
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
                        Register
                    </div>
                </button>
            </form>

        </div>
    )
}

export default Register;