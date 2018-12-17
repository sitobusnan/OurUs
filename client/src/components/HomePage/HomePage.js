import React, { Component } from 'react'
import { Link} from "react-router-dom";
import "./HomePage.css";


export default class HomePage extends Component {
  render() {
    
    return (
      <div>
        
        <Link to='/login'><button className="Rectangle-14" type="button" >LOGIN</button></Link>
        <Link to='/signup'><button className="Rectangle-14-Copy" type="button">SIGNUP</button></Link>
      </div>
    )
  }
}
