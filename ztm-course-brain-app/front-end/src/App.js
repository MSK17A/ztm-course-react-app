import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageBox from './components/ImageBox/ImageBox';
import React from 'react';

const init_state = {
  mRoute: 'SignedOut', //this is signed out page (That requires you to sign in to use the app)
  isSigned: false,
  img_url: '', // Try https://assets.weforum.org/article/image/XaHpf_z51huQS_JPHs-jkPhBp0dLlxFJwt-sPLpGJB0.jpg
  bboxes: [{}],
  user: { // This is the signed in user.
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends React.Component {

  // The state of the app, wether the user is signed in or not and also where is the user now?
  constructor() {
    super();
    this.state = {
      mRoute: 'SignedOut', //this is signed out page (That requires you to sign in to use the app)
      isSigned: false,
      img_url: '', // Try https://assets.weforum.org/article/image/XaHpf_z51huQS_JPHs-jkPhBp0dLlxFJwt-sPLpGJB0.jpg
      bboxes: [{}],
      user: { // This is the signed in user.
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
  /*componentDidMount() {
    fetch('https://localhost:4000/')
      .then(resonse => resonse.json())
      .then(console.log); // equivlant to data=>console.log().. Remember the async and callbacks?
  }*/

  // This function deals with routes, it is called whenever a route is change by pressing a button or something else?!
  onRouteChange = (route) => {
    if (route === "SignedOut") {
      //this.setState({ isSigned: false });
      // To update the state, load the initial state to ensure we cleared the state of the previous user.
      this.setState(init_state);
    }
    else if (route === "Home") {
      this.setState({ isSigned: true });
    }

    this.setState({ mRoute: route });
  }

  // Once you change the url the picture will update and will delete existing boxes.
  imageUrlChange = (event) => {
    this.setState({
      img_url: event.target.value,
      bboxes: [{}]
    });
  }

  // Detect boxes and convert them into pixels. (this will call the server in the back-end)
  detectBBoxOnClick = () => {

    fetch('http://localhost:4000/image', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
        img_url: this.state.img_url
      })
    })
      .then(response => response.json())
      .then(data => {

        const inputImage = document.getElementById("inputImage");
        const width = inputImage.width; const height = inputImage.height;

        // Below code is to convert boxes values to pixels, to draw it later.
        for (let bbox = 0; bbox < data.bboxes.length; bbox++) {
          data.bboxes[bbox].left_col = data.bboxes[bbox].left_col * width;
          data.bboxes[bbox].top_row = data.bboxes[bbox].top_row * height;
          data.bboxes[bbox].right_col = width - data.bboxes[bbox].right_col * width;
          data.bboxes[bbox].bottom_row = height - data.bboxes[bbox].bottom_row * height;

        }
        // Update the state with the new pixels, and the updated.
        this.setState({
          bboxes: data.bboxes,
        });
        // Update entries in the user object.
        this.setState(Object.assign(this.state.user, { entries: data.entries }));

        //console.log(data.bboxes);
      })
  }

  // Loads user into the app.
  loadUser = (data) => {

    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
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
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
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
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm imageUrlChange={this.imageUrlChange} detectBBoxOnClick={this.detectBBoxOnClick} />
          <ImageBox imageUrl={this.state.img_url} bounding_boxes={this.state.bboxes} />
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
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        </div>
      );
    }
    /*<FaceRecognition />*/
  }
}

export default App;
