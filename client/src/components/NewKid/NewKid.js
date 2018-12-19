import React, { Component } from 'react';
import AuthService from './../Tools';
import {Redirect} from "react-router-dom";
import "./NewKid.css";


export default class NewKid extends Component {
  constructor(props) {
    super(props);
    this.state = {
    name: '',
    family: this.props.user.family.name,
    age: 0,
    redirect: false
    };
    this.authService = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const {name, age, family} = this.state;
    this.authService.newKid({name, age, family})
    .then((kid) => {
      this.props.ifLoggedIn()
      this.setState({name: '', age: '', family: '',redirect: true})
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
      <h1>ADD NEW KID</h1>
        <form className="form-newkid" action="submit" onSubmit={this.handleFormSubmit}>
        <label htmlFor="">NAME</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={e => this.handlerState(e)}/>
          <label htmlFor="">AGE</label>
            <input
            type="number"
            name="age"
            id="age"
            onChange={e => this.handlerState(e)}/>
          <input className="submitbutton-newkid" type="submit" />
        </form>
      </div>
    )
  }
}
