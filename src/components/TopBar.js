import React from 'react'
import '../css/TopBar.css'
import * as DayFormatter from '../utils/DayFormatter'

const StatView = (props) => {
  return (
    <div className="card neu-card">
        <div className="texts">
          <label className="secondary">{props.des}</label>
          <label className="primary">{props.value}</label>
        </div>
        <img
          className="icon neu-icon"
          src={props.img}
        />
    </div>
  )
}



export default class TopBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "0",
      increase: 0
    }
  }

  getToday = () => {
    var today = DayFormatter.getToday()
    var todayArray = this.props.data.filter( obj => Object.keys(obj)[0] === today)
    if (todayArray.length > 0) {
      this.setState({
        value: Object.values(todayArray[0])[0]
      })
    }
  }
  getIncrease = () => {
    var increase = 100
    var months = DayFormatter.toMonth(this.props.data)
    var arrays = DayFormatter.getCurrentMonth()
    if (arrays[0]) {
      var currentMonth = months.filter(obj => obj["Месяц"] === arrays[1])
      if (currentMonth.length > 0) {
        var previousMonth = months.filter(obj => obj["Месяц"] === arrays[0])
        if (previousMonth.length > 0) {
          var currentValue = currentMonth[0]["Значение"]
          var previousValue = previousMonth[0]["Значение"]
          increase = Math.round((currentValue * 100) / previousValue) - 100
        }
      }
    }
    this.setState({
      increase
    })
  }


  componentDidMount () {
    this.getToday()
    this.getIncrease()
  }

  render () {
    return (
      <div className="Today">
        <div className="header">
          <h1>Статистика</h1>
          <label className="predict">
              Количество покупателей в следующем месяце:  {this.props.predict}
          </label>
        </div>
        <div className="headers">
            <StatView
              des="Сегодня продано"
              value={"+" + this.state.value}
              img={require("../media/cola.png")}
            />
            <StatView
              des="Выросло за месяц"
              value={this.state.increase + "%"}
              img={require("../media/stock.png")}
            />
        </div>
      </div>
    )
  }
}
