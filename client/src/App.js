import React, { Component } from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import Family from "./components/Family/Family";
import NewKid from "./components/NewKid/NewKid";
import Main from "./components/Main/Main";
import InviteSignup from "./components/InviteSignup/InviteSignup";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import AuthService from "./components/Tools";
import EditKid from "./components/EditKid/EditKid";
import NewMember from "./components/NewMember/NewMember";
import AboutUs from "./components/AboutUs/AboutUs";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      family: null
    };
    this.authService = new AuthService();
    this.ifLoggedIn();
  }

  getUser = user => {
    let newState = { ...this.state };
    newState.user = user.user;
    newState.family = user.family;
    this.setState(newState);
  };

  logout = () => {
    this.authService
      .logout()
      .then(() => this.setState({ ...this.state, user: null, family: null, redirect: true }));
      
  };

  ifLoggedIn = () => {
    this.authService.loggedin().then(user => {
      this.setState({...this.state, user: user.user, family: user.family});
      
    });
  };


  render() {
    console.log(this.state)
    
    if(this.state.redirect) {
      return <Redirect to="/"/>
    }
    const logged = this.state.user ? (
      <div>
        
        <Switch>
          <Route
            exact
            path="/profile"
            render={() => <Profile getUser={this.getUser} user={this.state} />}
          />
          <Route
            exact
            path="/family"
            render={() => <Family user={this.state} />}
          />
          <Route
            exact
            path="/newkid"
            render={() => <NewKid user={this.state} ifLoggedIn={this.ifLoggedIn} />}
          />
          <Route
            exact
            path="/editkid/:id"
            render={(props) => <EditKid {...props}/>}
          />
          <Route
            exact
            path="/main"
            render={() => <Main user={this.state}/>}
          />
          <Route
            exact
            path="/newmember"
            render={() => <NewMember user={this.state}/>}
          />
          <Route
            exact
            path="/about"
            render={() => <AboutUs/>}
          />
        </Switch>
        <div className="botton-bar">
        <Link className="a-home" to='/main'><img className="footer-img-home" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545315280/Canguro/elementos/home-icon-silhouette.png" alt=""/></Link>
        <img className="footer-img-alarm" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545315279/Canguro/elementos/alarm.png" alt=""/>
        <img className="footer-img-center" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545325506/Canguro/elementos/calendar-day-15.png" alt=""/>
        <img className="footer-img" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545315280/Canguro/elementos/camera.png" alt=""/>
        <Link className="a-about" to='/about'><img className="footer-img-about" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545315280/Canguro/elementos/multiple-users-silhouette.png" alt=""/></Link>
      </div>
      </div>
    ) : (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/login"
            render={() => <Login getUser={this.getUser} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup getUser={this.getUser} />}
          />
          <Route
            path="/mail/confirm/:token"
            render={(props) => <InviteSignup {...props}/> }
          />
        </Switch>
      </div>
    );
    return (
      <div className="App">
        <div className="text-box">{logged}</div>
      </div>
    );
  }
}

export default App;
