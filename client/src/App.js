import React, { Component } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Family from "./components/Family";
import Topbar from "./components/Topbar";
import InviteSignup from "./components/InviteSignup";
import { Redirect, Switch, Route } from "react-router-dom";
import AuthService from "./components/Tools";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      family: null,
      redirect: false
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
      console.log(this.state)
    });
  };

  render() {
    console.log(this.state)

    if(this.state.redirect) {
      return <Redirect to="/"/>
    }
    const logged = this.state.user ? (
      <div>
        <Topbar className="top-bar  " />
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
        </Switch>
        <button className="btn-logout" onClick={this.logout}>
          Logout
        </button>
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
