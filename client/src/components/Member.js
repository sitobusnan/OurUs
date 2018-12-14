import React, { Component } from 'react'

export default class Member extends Component {
  constructor(props){
    super(props)

    this.state = null
  }

  render() {
    return (
      <div>
        <img src="" alt=""/>
        <h1>{this.props.elem.name}</h1>
      </div>
    )
  }
}
