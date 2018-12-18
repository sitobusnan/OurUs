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
      <p>tu token es {this.props.match.params.token}</p>
      <h1>INVITED SIGNUP</h1>
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
          <input className="submitbutton" type="submit" />
        </form>
      </div>
    )
  }
}
