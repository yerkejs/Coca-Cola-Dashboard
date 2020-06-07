import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom'
import Auth from './Pages/Auth'
import Home from './Pages/Home'
import Spinner from './Pages/Spinner'
import './Backend'
import {connect} from 'react-redux'
import './css/App.css'

import firebase from 'firebase/app'
import 'firebase/auth'


class App extends React.Component {
  constructor(props) {
    super(props);

    let self = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user !== null) {
        self.props.dispatch({type: "SET_USER", user: user })
      } else {
        self.props.dispatch({type: "SET_USER", user: false })
      }
    })
  }

  render () {
    if (this.props.user == "LOADING") {
      return <Spinner/>
    } else {
      return (
        <div className="Wrapper">
            <Router>
              <Switch>
                  <Route exact path='/' component={Auth}/>
                  <Route exact path='/home' component={Home}/>
              </Switch>
            </Router>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  };
}
export default connect(mapStateToProps)(App)
