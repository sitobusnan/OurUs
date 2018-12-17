import React, { Component } from 'react'
import AuthService from './Tools'
import {Redirect} from "react-router-dom";
import noProfile from '../no_user.png'

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
      const confirm = this.state.edit ? (<input className="submitbutton" type="submit" />) : (<div></div>);
      const user_img = this.state.photo==="noProfile" ? (<div className="img-edit"><img className="img-profile" src={noProfile} alt=""/></div>) : (<div className="img-edit"><img className="img-profile" src={this.data.photo} alt=""/></div>);
      const edit_img = this.state.edit ? (<input type="file" name="photo" onChange={e => this.handlerState(e)} />) : (<div></div>);
      
    if(this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <form action="" onSubmit={this.handleFormSubmitImage}>
        {user_img}
        {edit_img}
        {confirm}
        </form>
        <form action="" onSubmit={this.handleFormSubmit}>
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
        <input className="submitbutton" type="button" value="EDIT" onClick={this.handleFormEdit}/>
        {confirm}
        </form>
      </div>
    )
  }
}
