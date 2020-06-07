import React from 'react'
import * as DayFormatter from '../utils/DayFormatter'
import {
  XAxis, YAxis, Tooltip,
  AreaChart, Area
} from 'recharts';
import '../css/ProgressDays.css'

export default class All extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      main: [],
      data: [],
      mode: "День"
    }
  }

  componentDidMount () {
    this.setState({
      data: DayFormatter.toDays(this.props.data).reverse(),
      main: this.props.data
    })
  }





  render () {
    let { mode, data } = this.state

    return (
      <div className="ProgressDays neu-card">
        <div className="GraphHeader">
          <h1>Общий график</h1>
        </div>
        <div className="charts">
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
                dataKey={mode}
                allowDecimals={false}
                tick={{
                  stroke: 'red',
                  strokeWidth: 1
                }}
                axisLine={false}
                padding={{
                  left: 20,
                  right: 20
                }}
              />
              <YAxis
                dataKey="Значение"
                allowDecimals={false}
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
