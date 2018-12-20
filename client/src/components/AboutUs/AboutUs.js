import React, { Component } from 'react'
import "./AboutUs.css";

export default class AboutUs extends Component {
  render() {
    return (
      <div className="aboutus">
        <img className="logo-img" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545206516/Canguro/Logo.png.png" alt=""/>
        <h3>OurUs</h3>
        <h4>Ver 0.1</h4>

        <div className="us-content">
          <h4>ORIGINAL IDEA</h4>
          <img className="img-about" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545340438/Canguro/elementos/maribel_opt.jpg" alt=""/>
          <h3>MARIBEL</h3>
          <h3>UX/UI DESIGNER</h3>
        </div>
        <div className="us-content">
          <h4>CODED BY</h4>
          <img className="img-about" src="https://res.cloudinary.com/deosqppvg/image/upload/v1545340438/Canguro/elementos/sito_opt.jpg" alt=""/>
          <h3>SITO</h3>
          <h3>WEB DEVELOPER</h3>
        </div>

      </div>
    )
  }
}
