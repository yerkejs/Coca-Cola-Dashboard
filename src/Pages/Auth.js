import React from 'react'
import '../css/Auth.css'
import {connect} from 'react-redux'
import { auth } from '../Backend'
import {Redirect} from 'react-router-dom'





class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "", password: "",
      loading: false
    }
  }

  send = async (e) => {
    e.preventDefault()
    let {email, password} = this.state
    this.setState({ loading: true })
    try {
      const response = await auth.login(email, password)
      this.setState({ loading: false })
      this.props.dispatch({type: "SET_USER", user: response.user })
      console.log(response.user)
    } catch (e) {
      this.showError(e.message, e.message)
    }
  }

  showError = (title, message) => {
    this.setState({ loading: false })
    alert(title)
  }


  render () {
    if (this.props.user !== false ) {
      return <Redirect to="/home"/>
    } else {
      let {email, password} = this.state
      return (
        <div className="Auth">
            <div className="content">
              <h1 onClick={()=>console.log(this.props)}>Войти</h1>
              <p>Заполните поля чтобы посмотреть админскую панель</p>
              <form className="form" onSubmit={this.send}>
                  <input required type="email" placeholder="Электронная почта" value={email} onChange={(e)=>this.setState({email: e.target.value})}/>
                  <input required type="password" placeholder="Пароль" value={password} onChange={(e)=>this.setState({password: e.target.value})}/>
                  <button>{this.state.loading ? "●●●" : "Готово"}</button>
              </form>
            </div>
            <img className="wall" src={require("../media/login.svg")}/>
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
export default connect(mapStateToProps)(Auth)
