import React from 'react'
import '../css/Select.css'


class Option extends React.Component {
  render () {
    return (
      <div
        className="Option"
        onClick={
          ()=> {
            this.props.onOptionSelect(this.props.name)
            this.props.closeOptions()
          }
        }>
        <label>{this.props.name}</label>
      </div>
    )
  }
}

export default class Select extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  render () {
    return (
      <div className="Select">
        <div
          className="CurrentOption neu-inset"
          onClick={()=>this.setState({show: !this.state.show})}>
            <label>{this.props.currentOption}</label>
        </div>
        {
          this.state.show ?
            <div className="options neu-inset">
              {this.props.options.map((option, i) =>
                <Option
                  key={i}
                  name={option}
                  onOptionSelect={this.props.onOptionSelect}
                  closeOptions={()=>this.setState({ show: false })}
                />
              )}
            </div>
          :
          null
        }
      </div>
    )
  }
}
