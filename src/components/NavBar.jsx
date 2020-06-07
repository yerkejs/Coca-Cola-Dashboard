import React from 'react'
import '../css/NavBar.css'
import {auth} from '../Backend'


const Icon = (props) => {
  return (
    <div className="Icon">
      {props.name}
    </div>
  )
}

export default class NavBar extends React.Component {

  signOut = async () => {
    try {
      const response = await auth.signOut()
    } catch (e) {
      alert(e.message);
      console.log(e)
    }
  }

  render () {
    return (
      <div className="NavBar">
          <img
            className="icon"
            src={require("../media/home.png")}
          />
          <img
            className="icon"
            src={require("../media/exit.png")}
            onClick={this.signOut}
          />
      </div>
    )
  }
}
