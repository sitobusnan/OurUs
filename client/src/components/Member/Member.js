import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Member.css";

export default class Member extends Component {
  constructor(props) {
    super(props);

    this.state = null;
  }

  render() {
    const member = this.props.elem.type ? (
      <div className="member-kid-div">
        <div className="member-div">
          <div className="img-edit">
            <img className="img-profile" src={this.props.elem.photo} alt="" />
          </div>
          <h1>{this.props.elem.username}</h1>
        </div>
        <Link to={`/editkid/${this.props.elem._id}`}>
          <button className="btn-kid" type="button">
            EDTI KID
          </button>
        </Link>
      </div>
    ) : (
      <div className="member-div">
        <div className="img-edit">
          <img className="img-profile" src={this.props.elem.photo} alt="" />
        </div>
        <h1>{this.props.elem.username}</h1>
      </div>
    );

    return <div>{member}</div>;
  }
}
