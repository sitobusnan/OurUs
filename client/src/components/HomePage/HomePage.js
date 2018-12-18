import React, { Component } from 'react'
import { Link} from "react-router-dom";
import "./HomePage.css";


export default class HomePage extends Component {
  render() {
    
    return (
      <div className="portada">
        <div className="imagen-portada-div">
          <img className="imagen-portada" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545132784/Canguro/Logo.png" alt=""/>
        </div>
        <div className="botonera">
        <Link to='/login'><button className="Rectangle-14" type="button" >LOGIN</button></Link>
        <Link to='/signup'><button className="Rectangle-14-Copy" type="button">SIGNUP</button></Link>
        </div>
      </div>
    )
  }
}
