import React from "react";
import './Register.css'

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            registerUserName: "",
            registerEmail: "",
            registerPassword: ""
        }
    }

    onUserNameChange = (event) => {
        this.setState({ registerUserName: event.target.value })
        console.log(this.state.registerUserName);
    }
    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value })
    }
    onRegisterClick = () => {
        /*console.log(JSON.stringify({
            name: this.state.registerUserName,
            email: this.state.registerEmail,
            password: this.state.registerPassword
        }))*/

        fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: this.state.registerUserName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
            .then(response => response.json())
            .then(user => {

                this.props.loadUser(user);
                this.props.onRouteChange("Home");
            })
    }

    render() {
        return (
            <div>
                <form autoComplete='on' className='form'>
                    <div className='control'>
                        <h1>
                            Create an account!
                        </h1>
                    </div>
                    <div className='control block-cube block-input'>
                        <input name='username' placeholder='Username' type='text' onChange={this.onUserNameChange} />
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
                        <input name='email' placeholder='Email' type='text' onChange={this.onEmailChange} />
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
                        <input name='password' placeholder='Password' type='password' onChange={this.onPasswordChange} />
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
                        onClick={this.onRegisterClick}
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
}

export default Register;