import React, { Component } from 'react'
import AuthService from './../Tools'
import {Redirect} from "react-router-dom";
import noProfile from '../../no_user.png'
import "./Profile.css";

export default class Profile extends Component {
  constructor(props){
    super(props)


    
    this.data = this.props.user.user
    this.state = {
      username: this.data.username,
      family: this.data.family,
      email: this.data.email,
      rol: this.data.rol,
      photo: this.data.photo,
      edit: false,
      redirect: false
      
    }
    
    
    this.authService = new AuthService();
    
  }

  logout = () => {
    this.authService
      .logout()
      .then(() => this.setState({ ...this.state, user: null, family: null, redirect: true }));
      
  };

  handleFormEdit = () =>{
    let change = !this.state.edit;
    this.setState({edit:change})
  }

  handlerState = (e) => {
    const {name, value} = e.target;
    if(name === "photo") {
      this.setState({...this.state, photo: e.target.files[0]})
    } else {
      this.setState({...this.state, [name]: value});
    }
  }

  handleFormSubmitImage = event =>{
    event.preventDefault();
    const {photo} = this.state;
    this.authService.editproimg({user:this.data._id,photo:photo})
    .then((user) => {
      this.props.getUser(user)
      this.setState({photo: user.user.photo, redirect:true})
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const {username, email} = this.state;
    this.authService.editpro({user:this.data._id,username:username,email:email})
    .then((user) => {
      this.props.getUser(user)
      this.setState({username: user.user.username, email: user.user.email, redirect:true})
    });
  };
  
  render() {
    
    
      const editname = this.state.edit ? (<input type="text" name="username" value={this.state.username} onChange={(e)=>this.handlerState(e)}/>) : (<div></div>);
      const email = this.state.edit ? (<input type="text" name="email" value={this.state.email} onChange={(e)=>this.handlerState(e)}/>) : (<div></div>);
      const confirm = this.state.edit ? (<input className="submitbutton-profile" type="submit" />) : (<div></div>);
      const edit_img = this.state.edit ? (<input type="file" name="photo" onChange={e => this.handlerState(e)} />) : (<div></div>);
      
    if(this.state.redirect) {
      return <Redirect to="/main" />
    }
    return (
      <div className="ironprofile">
        <form className="profile-user" action="" onSubmit={this.handleFormSubmitImage}>
          <div className="img-edit-profile"><img className="img-profile" src={this.data.photo} alt="" /></div>
          {edit_img}
          {confirm}
        </form>
        <form  className="profile-form" action="" onSubmit={this.handleFormSubmit}>
          <label htmlFor="">USERNAME</label>
          <h2>{this.data.username}</h2>
          {editname}
          <label htmlFor="">FAMILY</label>
          <h2>{this.data.family}</h2>
          <label htmlFor="">ROL</label>
          <h2>{this.data.rol}</h2>
          <label htmlFor="">EMAIL</label>
          <h2>{this.data.email}</h2>
          {email}
          {confirm}
          <input className="submitbutton-profile" type="button" value="EDIT" onClick={this.handleFormEdit} />
        </form>
        <button className="btn-logout" onClick={this.logout}>
          LOGOUT
        </button>
      </div>
    )
  }
}
