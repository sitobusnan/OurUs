import React, { Component } from "react";
import Member from "../Member/Member";
import AuthService from "./../Tools";
import { Link, Redirect } from "react-router-dom";
import "./Family.css";

export default class Family extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      family: null,
      newMemberState : false,
      redirect: false
    };

    this.authService = new AuthService();
    this.ifLoggedIn()
  }

  ifLoggedIn = () => {
    this.authService.loggedin().then(user => {
      this.setState({...this.state, family: user.family});
      
    });
  };

  componentDidMount() {
    this.setState({...this.state, family: this.props.user.family})
  }

  

  handleFormEdit = () =>{
    let change = !this.state.newMemberState;
    this.setState({newMemberState:change})
  }

  
  

  render() {
    if(this.state && this.state.redirect) {
      return <Redirect to="/" />
    }
    
    if (this.state.family) {
      return (
        <div className="family">
          <div className="tutors-div">
            <h1>TUTORS</h1>
          {this.state.family.tutors.map((element, index) => {
            return <Member key={index} elem={element} />;
          })}
          <Link to='/newmember' family={this.state.family}><button className="btn-family" type="button">ADD MEMBER</button></Link>
          </div>
          <div className="kids-div">
            <h1>KIDS</h1>
          {this.state.family.kids.map((element, index) => {
            return <Member key={index} elem={element} />;
          })}
          <Link to='/newkid'><button className="btn-family" type="button">ADD KID</button></Link>
          </div>
        </div>
      );
    } else {
      return <h1>LOADING...</h1>;
    }
  }
}