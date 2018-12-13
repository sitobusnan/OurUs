import React, { Component } from "react";
import Member from "./Member";
import AuthService from "./Tools";

export default class Family extends Component {
  constructor(props) {
    super(props);

    this.state = {
      family: this.props.user.family,
      newMail: null,
      newRol: null
    };

    this.authService = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const mail = this.state.newmail;
    let token = this.state.family.token;
    if(this.state.newRol === 'Admin'){
      token = 'A'+token;
    }else{
      token = 'N'+token;
    }
    this.authService.mail(mail, token);
  };

  handlerStateMail = e => {
    const newmail = e.target.value;
    this.setState({ newmail: newmail });
  };
  handlerStateRol = e => {
    const newrol = e.target.value;
    this.setState({ newrol: newrol });
  };

  render() {
    console.log(this.state.family.tutors);
    if (this.state.family) {
      return (
        <div>
          {this.state.family.tutors.map((element, index) => {
            return <Member key={index} elem={element} />;
          })}
          <form action="submit" onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              name="family"
              id="family"
              onChange={e => this.handlerStateMail(e)}
            />
            <label htmlFor="">Rol?</label>
            <select id="rol" name="rol" defaultValue="Select Rol" onChange={e => this.handlerStateRol(e)}>
              <option value="Admin">Admin</option>
              <option value="Nany">Nany</option>
            </select>
            <input className="submitbutton" type="submit" />
          </form>
          {this.state.family.kids.map((element, index) => {
            return <Member key={index} elem={element} />;
          })}
        </div>
      );
    } else {
      return <h1>LOADING...</h1>;
    }
  }
}
