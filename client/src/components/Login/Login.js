import React, { Component } from "react";
import AuthService from './../Tools'
import {Redirect} from "react-router-dom";
import "./Login.css";

export default class Login extends Component {
  constructor(){
    super()

    this.state = {
        user : null,
        username: '',
        password: '',
        redirect: false
      
    }
    this.authService = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const {username, password} = this.state;
    this.authService.login({username, password})
    .then((user) => {
      this.setState({username:'', password: '',user:user.user,redirect: true})
      this.props.getUser(user)
    });
  };

  handlerState = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
    
  }

  render() {
    console.log(this.state.user)
    if(this.state.redirect) {
      console.log("TPM")
      return <Redirect to="/main" />
    }
    return (
      <div className="ironprofile">
        <div className="imagen-login-div">
          <img className="imagen-login" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545132784/Canguro/Logo.png" alt=""/>
        </div>
        <div className="form-login">
        <form action="submit" onSubmit={this.handleFormSubmit}>
        <label>USERNAME</label>
          <input type="text" name="username" id="" placeholder="Username" onChange={(e)=>this.handlerState(e)}/>
          <label>PASSWORD</label>
          <input type="text" name="password" id="" placeholder="Password" onChange={(e)=>this.handlerState(e)}/>
          <div className="login-button">
          <input className="submitbutton-login" type="submit" />
          </div>
        </form>
        </div>
      </div>
    );
  }
}
