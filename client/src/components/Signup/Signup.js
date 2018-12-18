import React, { Component } from "react";
import AuthService from "./../Tools";
import {Redirect} from "react-router-dom";
import "./Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    username: '',
    password: '',
    family: '',
    redirect: false
    };
    this.authService = new AuthService();
    this.user = {};

  }

  handleFormSubmit = event => {
    event.preventDefault();
    const {username, password, email, family} = this.state;
    this.authService.signup({username, password, email, family})
    .then((user) => {
      this.props.getUser(user)
      this.setState({username: '', password: '', email: '', family: '',redirect: true})
    });
  };

  handlerState = e => {
    
    const { name, value } = e.target;
    this.setState({ [name]: value });
    
  };

  render() {
    if(this.state && this.state.redirect) {
      return <Redirect to="/"/>
    }
    return (
      <div className="ironprofile">
        <div className="imagen-portada-div">
          <img className="imagen-portada" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545132784/Canguro/Logo.png" alt=""/>
        </div>
        <form action="submit" onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="username"
            id="name"
            onChange={e => this.handlerState(e)}/>
          <input
            type="password"
            name="password"
            id="pass"
            onChange={e => this.handlerState(e)}/>
            <input
            type="email"
            name="email"
            id="email"
            onChange={e => this.handlerState(e)}/>
            <label htmlFor=""></label>
            <input
            type="text"
            name="family"
            id="family"
            onChange={e => this.handlerState(e)}/>
          <input className="submitbutton" type="submit" />
        </form>
      </div>
    );
  }
}
