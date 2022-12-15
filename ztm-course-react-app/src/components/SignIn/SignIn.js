import React from "react";
import './SignIn.css'

// I just converted this into a smart component, so that I can put its functions seperated form the app.js.
class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event = Event) => {
        this.setState({ signInEmail: event.target.value })
    }
    onPasswordChange = (event = Event) => {
        this.setState({ signInPassword: event.target.value })
    }

    // This function will sign you in once you click the sign in button.
    onSubmitSignIn = () => {

        fetch('http://localhost:4000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange("Home");
                }
            });

    }
    render() {

        //const { onRouteChange } = this.props;
        return (
            <div>
                <form autoComplete='on' className='form'>
                    <div className='control'>
                        <h1>
                            Sign In
                        </h1>
                    </div>
                    <div className='control block-cube block-input'>
                        <input name='Email' placeholder='Email' type='text' onChange={this.onEmailChange} />
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
                        onClick={this.onSubmitSignIn} /* Why you put a function inside a function you may ask?
                    It is bacause you want to pass it as a reference (onRouteChange) without '()', how ever we have an input here. That is why we put it
                    inside an arrow function to prevent calling it each time <button> is rendered. */
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
}

export default SignIn;