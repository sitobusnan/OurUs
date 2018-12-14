import React, { Component } from 'react';
import AuthService from './Tools';
import {Redirect} from "react-router-dom";


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
      <h1>Add new Kid</h1>
        <form action="submit" onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            onChange={e => this.handlerState(e)}/>
          
            <input
            type="number"
            name="age"
            id="age"
            onChange={e => this.handlerState(e)}/>
          <input className="submitbutton" type="submit" />
        </form>
      </div>
    )
  }
}
