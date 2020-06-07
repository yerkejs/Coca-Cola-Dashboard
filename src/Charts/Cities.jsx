import React from 'react'
import {
  BarChart, YAxis, Tooltip,
  Bar, XAxis, Legend, Brush
} from 'recharts';
import '../css/Cities.css'


export default class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount () {
    var result = []
    Object.keys(this.props.data).map((city, i) => {
      var object = this.props.data[city]
      object["city"] = city
      result.push(object)
    })
    this.setState({ data: result })
  }


  render () {

    return (
      <div className="Cities neu-card">
          <div className="GraphHeader">
             <h1>Города</h1>
          </div>
          <div className="chart">
          <BarChart
             width={this.props.w - 60}
             height={300}
             data={this.state.data}
             margin={{
               top: 20, bottom: 20,
             }}
          >
            <XAxis
              dataKey="city"
              axisLine={false}
              tick={{
                stroke: 'red',
                strokeWidth: 0.7
              }}
            />
            <YAxis
              axisLine={false}
              tick={{
                stroke: 'red',
                strokeWidth: 0.7
              }}
            />
            <defs>
             <linearGradient id="main" x1="1" y1="1" x2="0" y2="1">
               <stop offset="5%" stopColor="#e83f3f"/>
               <stop offset="95%" stopColor="#ff4a4a"/>
             </linearGradient>
            </defs>
            <Tooltip />
            <Bar
              dataKey="Значение"
              fill="url(#main)"
              background={{ fill: '#ffebeb' }}
            />
            <Brush dataKey="city" height={30} stroke="#ff4a4a" />
          </BarChart>
          </div>
      </div>
    )
  }
}
