import React, { Component } from 'react'
import AuthService from "./../Tools";
import {Redirect} from "react-router-dom";
import "./InviteSignup.css";

export default class InviteSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    username: '',
    password: '',
    email: '',
    redirect: false
    };
    this.authService = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const {username, password, email} = this.state;
    const token = this.props.match.params.token
    this.authService.invitedSignup({username, password, email, token})
    .then((user) => {
      this.setState({username: '', password: '', email: '', family: '',redirect: true})
    });
  };

  handlerState = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {

    
    if(this.state.redirect) {
      return <Redirect to="/"/>
    }

    return (
      <div className="ironprofile">
        <div className="imagen-invite-div">
          <img className="imagen-invite" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545132784/Canguro/Logo.png" alt=""/>
        </div>
        <div className="form-invite">
        <form action="submit" onSubmit={this.handleFormSubmit}>
        
        <label>USERNAME</label>
          <input
            type="text"
            name="username"
            id="name"
            onChange={e => this.handlerState(e)}/>
            <label>PASSWORD</label>
          <input
            type="password"
            name="password"
            id="pass"
            onChange={e => this.handlerState(e)}/>
            <label>EMAIL</label>
            <input
            type="email"
            name="email"
            id="email"
            onChange={e => this.handlerState(e)}/>
            <label htmlFor=""></label>
          <input className="submitbutton-invite" type="submit" />
        </form>
        </div>
      </div>
    )
  }
}
