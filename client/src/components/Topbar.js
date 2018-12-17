import React, { Component } from 'react'
import { Link, Switch, Route } from "react-router-dom";

export default class Topbar extends Component {
  render() {
    return (
      <div className="top-bar">
        <div>
        <Link to='/profile'><button type="button" >PROFILE</button></Link>
        </div>
        <div>
        <Link to='/family'><button type="button" >FAMILY</button></Link>
        </div>
        <div>
        <Link to='/'><button type="button" >PANEL</button></Link>
        </div>
      </div>
    )
  }
}
