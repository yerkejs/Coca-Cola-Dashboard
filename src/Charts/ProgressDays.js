import React from 'react'
import {
  LineChart, Line,
  XAxis, YAxis, Tooltip,
  AreaChart, Area
} from 'recharts';
import Select from '../components/Select.js'
import '../css/ProgressDays.css'


export default class ProgressDays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      months: ["Все месяцы"],
      currentMonth: "Все месяцы"
    }
  }


  getMonths = () => {
    var { data } = this.state
    var months = ["Все месяцы"]
    data.map(( obj, i ) => {
      months.push(this.getMonth(obj))
    })
    this.setState({months})
  }


  componentWillReceiveProps (newProps) {


    if( newProps.currentCity !== this.props.currentCity ) {
      if (this.props.data !== undefined) {
        this.setState({
          data: newProps.data.days,
          filteredData: this.doFilter(newProps.data.days, this.state.currentMonth)
        },()=>{
          this.getMonths()
        })
      }
    }
  }

  componentDidMount() {
    if (this.props.data !== undefined) {
      this.setState({
        data: this.props.data.days,
        filteredData: this.props.data.days
      }, () => {
        this.getMonths()
      })
    }
  }


  monthChanged = (currentMonth) => {
    this.setState({
      currentMonth,
      filteredData: this.doFilter(this.state.data, currentMonth)
    })
  }
  getMonth = (obj) => {
    const monthsNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
    var month = parseInt(obj["День"].split(".")[1])
    return monthsNames[month - 1]
  }
  doFilter = (data, filter) => {
    var result = []
    if (filter === "Все месяцы") {
      result = data
    } else {
      result = data.filter( obj => this.getMonth(obj) === filter )
    }
    return result
  }

  render () {
    var data = this.state.filteredData
    return (
      <div className="ProgressDays neu-card">
          <div className="GraphHeader">
              <h1>Месяцы</h1>
              <div className="selects">
                <Select
                  currentOption={this.props.currentCity}
                  options={this.props.cities}
                  onOptionSelect={this.props.onOptionSelect}
                />
                <Select
                  currentOption={this.state.currentMonth}
                  options={this.state.months}
                  onOptionSelect={this.monthChanged}
                />
              </div>
          </div>
          <div className="chart">
              <AreaChart
                width={this.props.w - 60}
                height={300}
                data={data}
                margin={{
                  top: 5, right: 0, left: -10, bottom: 5,
                }}
              >
                 <defs>
                    <linearGradient id="main" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff9696" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f64747" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="День"
                    allowDecimals={false}
                    tick={{
                      stroke: 'red',
                      strokeWidth: 1
                    }}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="Значение"
                    tick={{
                      stroke: 'red',
                      strokeWidth: 1
                    }}
                    axisLine={false}
                    padding={{
                      top: 10, bottom: 10
                    }}
                  />
                  <Tooltip />
                  <Area type="monotone" strokeWidth={5} dataKey="Значение"  fill="url(#main)" stroke="#eb1717" strokeWidth={2} />
              </AreaChart>
          </div>
      </div>
    )
  }
}
