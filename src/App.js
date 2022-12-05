import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import React from 'react';

class App extends React.Component {

  // The state of the app, wether the user is signed in or not and also where is the user now?
  constructor() {
    super();
    this.state = {
      mRoute: 'SignedOut', //this is signed out page (That requires you to sign in to use the app)
      isSigned: false
    }
  }

  // This function deals with routes, it is called whenever a route is change by pressing a button or something else?!
  onRouteChange = (route) => {
    if (route === "SignedOut") {
      this.setState({ isSigned: false });
    }
    else if (route === "Home") {
      this.setState({ isSigned: true });
    }

    this.setState({ mRoute: route });
  }
  render() {

    // Checks if you are in the signed out page, and renders it
    if (this.state.mRoute === 'SignedOut') {
      return (
        <div className="App">
          <div className='Header_Cointainer'>
            <Logo />
            <Navigation onRouteChange={this.onRouteChange} isSigned={this.state.isSigned} />
          </div>
          <SignIn onRouteChange={this.onRouteChange} />
        </div>
      );
    }
    // Checks if you are in the home page, and renders it
    else if (this.state.mRoute === 'Home') {
      return (
        <div className="App">
          <div className='Header_Cointainer'>
            <Logo />
            <Navigation onRouteChange={this.onRouteChange} isSigned={this.state.isSigned} />
          </div>
          <Rank />
          <ImageLinkForm />
        </div>
      );
    }
    // Checks if you are in the Registeration page, and RENDERS IT!!!
    else if (this.state.mRoute === 'Register') {
      return (
        <div className="App">
          <div className='Header_Cointainer'>
            <Logo />
            {/*Passing two params, a function that deals with route changing, and variable
            that checks if the user is signed or not, just to update the navigation buttons*/}
            <Navigation onRouteChange={this.onRouteChange} isSigned={this.state.isSigned} />
          </div>
          <Register onRouteChange={this.onRouteChange} />
        </div>
      );
    }
    {/*<FaceRecognition />"*/ }
  }
}

export default App;
