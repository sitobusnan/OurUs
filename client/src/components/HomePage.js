import React, { Component } from 'react'
import { Link, Switch, Route } from "react-router-dom";


export default class HomePage extends Component {
  render() {
    
    return (
      <div className="ironprofile">
        <h1>El Canguro Hippie</h1>
        <p></p>
        <Link to='/login'><button type="button" >LOGIN</button></Link>
        <Link to='/signup'><button type="button">SIGNUP</button></Link>
      </div>
    )
  }
}
