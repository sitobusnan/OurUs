import React, { Component } from "react";
import AuthService from "./../Tools";
import "./NewMember.css";
import { Input, Redirect } from "react-materialize";

export default class NewMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      family: this.props.user.family,
      newmail: null,
      newRol: null
    };
    this.authService = new AuthService();
  }

  handlerStateMail = e => {
    const newmail = e.target.value;
    this.setState({ newmail: newmail });
  };

  handlerStateRol = e => {
    const newrol = e.target.value;
    this.setState({ newrol: newrol });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const mail = this.state.newmail;
    let token = this.state.family.token;
    if (this.state.newRol === "Admin") {
      token = "A" + token;
    } else {
      token = "N" + token;
    }
    this.authService.mail(mail, token);
    this.setState({ redirect: true });
  };

  render() {
    if(this.state.redirect) {
      return <Redirect to="/main" />
    }
    return (
      <div className="ironprofile">
        <div className="form-newmember">
          <form action="submit" onSubmit={e => this.handleFormSubmit(e)}>
            <label htmlFor="">EMAIL</label>
            <input
              type="text"
              name="family"
              id="family"
              onChange={e => this.handlerStateMail(e)}
            />
            <label htmlFor="">ROL?</label>
            <Input s={12} type='select' defaultValue='Select Rol' onChange={e => this.handlerStateRol(e)}>
              <option value=''>Select Rol</option>
              <option value='Admin'>Administrator</option>
              <option value='Nany'>Nany</option>
            </Input>
            <div className="submitbutton-newmember">
              <input type="submit" value="SEND INVITATION"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
