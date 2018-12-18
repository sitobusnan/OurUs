import React, { Component } from 'react'
import AuthService from './../Tools'
import noProfile from '../../no_user.png'
import { Redirect } from "react-router-dom";

export default class EditKid extends Component {
  constructor(props){
    super(props)

    this.state = {
      id: null,
      username: null,
      type: null,
      family: null,
      photo: null,
      age: null,
      allergies: null,
      intolerances: null,
      vaccinations: null,
      edit: false,
      redirect: false,
      addAllergie: '',
      addIntolerance: '',
      addVaccinations:''
    }
    this.authService = new AuthService();
    this.getIdKid(this.props.match.params.id)
    this.dataKid = {}
    this.ifLoggedIn()
  }

  ifLoggedIn = () => {
    this.authService.loggedin().then(user => {
      this.setState({...this.state, family: user.family});
      
    });
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

  getIdKid = (kid)=>{
    this.authService.getKid(kid)
    .then((kid)=>{
      this.dataKid = kid;
      let newState = {...this.state}
      newState.id = kid._id;
      newState.age = kid.age;
      newState.allergies = kid.allergies;
      newState.family = kid.family;
      newState.intolerances = kid.intolerances;
      newState.photo = kid.photo;
      newState.type = kid.type;
      newState.username = kid.username;
      newState.vaccinations = kid.vaccinations;
      this.setState(newState)
      this.dataKid = newState
    })
  }

  handleFormSubmitAllergie = (event)=>{
    event.preventDefault();
    const {addAllergie} = this.state;
    this.authService.addAlle({alle:addAllergie,id:this.state.id})
    .then((kid)=>{
      this.setState({allergies: kid.allergies})
    })
  }

  handleFormSubmitVaccinations = (event)=>{
    event.preventDefault();
    const {addVaccination} = this.state;
    this.authService.addVac({vac:addVaccination,id:this.state.id})
    .then((kid)=>{
      this.setState({vaccinations: kid.vaccinations})
    })
  }

  handleFormSubmitIntolerances = (event)=>{
    event.preventDefault();
    const {addIntolerance} = this.state;
    this.authService.addInt({int:addIntolerance,id:this.state.id})
    .then((kid)=>{
      this.setState({intolerances: kid.intolerances})
    })
  }

  handleFormSubmitImage = event =>{
    event.preventDefault();
    const {photo} = this.state;
    this.authService.editkidimg({kid:this.state.id,photo:photo})
    .then((kid) => {
      this.setState({photo: kid.photo, edit: false, redirect: true})
    });
  };



  render() {
    if(this.state.redirect) {
      return <Redirect to="/family"/>
    }
    console.log(this.state)
    if (this.state.username) {
      const user_img = this.state.photo==="noProfile" ? (<div className="img-edit"><img className="img-profile" src={noProfile} alt=""/></div>) : (<div className="img-edit"><img className="img-profile" src={this.state.photo} alt=""/></div>);
      const edit_img = this.state.edit ? (<input type="file" name="photo" onChange={e => this.handlerState(e)} />) : (<div></div>);
      const confirm = this.state.edit ? (<input className="submitbutton" type="submit" />) : (<div></div>);
      const editname = this.state.edit ? (<input type="text" name="username" value={this.state.username} onChange={(e)=>this.handlerState(e)}/>) : (<div></div>);
      const editage = this.state.edit ? (<input type="text" name="age" value={this.state.age} onChange={(e)=>this.handlerState(e)}/>) : (<div></div>);
      const editalle = this.state.edit ? (<form action="submit" onSubmit={this.handleFormSubmitAllergie}>
      <input type="text" name="addAllergie" onChange={(e)=>this.handlerState(e)}/>
      <input className="submitbutton" type="submit" />
      </form>):(<div></div>)
      const editvac = this.state.edit ? (<form action="submit" onSubmit={this.handleFormSubmitVaccinations}>
      <input type="text" name="addVaccination" onChange={(e)=>this.handlerState(e)}/>
      <input className="submitbutton" type="submit" />
      </form>):(<div></div>)
      const editint = this.state.edit ? (<form action="submit" onSubmit={this.handleFormSubmitIntolerances}>
      <input type="text" name="addIntolerance" onChange={(e)=>this.handlerState(e)}/>
      <input className="submitbutton" type="submit" />
      </form>):(<div></div>)
      return (
        <div>
          <form action="" onSubmit={this.handleFormSubmitImage}>
        {user_img}
        {edit_img}
        {confirm}
        </form>
          <h2>{this.dataKid.username}</h2>
          {editname}
          <h3>{this.dataKid.age}</h3>
          {editage}
          <h4>ALLERGIES</h4>
          <ul>
            {this.state.allergies.map((element)=>{return <li>{element}</li>})}
          </ul>
          {editalle}
          <h4>INTOLERANCES</h4>
          <ul>
          {this.state.vaccinations.map((element)=>{return <li>{element}</li>})}
          </ul>
          {editvac}
          <h4>VACCINATIONS</h4>
          <ul>
          {this.state.intolerances.map((element)=>{return <li>{element}</li>})}
          </ul>
          {editint}
          <input className="submitbutton" type="button" value="EDIT" onClick={this.handleFormEdit}/>
        </div>
      )
    } else {
      return <h1>LOADING...</h1>;
    }
  }
}
