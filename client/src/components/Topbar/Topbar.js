import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "./Topbar.css";

export default class Topbar extends Component {
  render() {
    return (
      <div className="top-bar">
        <div>
        <Link to='/main'><button type="button" >PANEL</button></Link>
        </div>
      </div>
    )
  }
}
