import React, { Component } from 'react'
import noProfile from '../no_user.png'
import {Link, Route} from "react-router-dom";
import EditKid from "./EditKid";

export default class Member extends Component {
  constructor(props){
    super(props)

    this.state = null
  }

  render() {
    const photo = this.props.elem.photo==="noProfile" ? (<div className="img-edit"><img className="img-profile" src={noProfile} alt=""/></div>) : (<div className="img-edit"><img className="img-profile" src={this.props.elem.photo} alt=""/></div>);
    const member = this.props.elem.type? (
      
      <div>
      {photo}
      <h1>{this.props.elem.username}</h1>
      <Link to={`/editkid/${this.props.elem._id}`} ><button type="button" >EDTI KID</button></Link>
    </div>):(<div>
      {photo}
      <h1>{this.props.elem.username}</h1>
      
    </div>)
    
    return (
      <div>
        {member}
      </div>
      
    )
  }
}
