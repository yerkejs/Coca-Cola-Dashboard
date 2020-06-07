import React from 'react'
import '../css/Home.css'
import {connect} from 'react-redux'
import { auth, firestore } from '../Backend'
import {Redirect} from 'react-router-dom'
import MarketingMap from './Maps'
import ProgressDays from '../Charts/ProgressDays'
import Cities from '../Charts/Cities'
import * as Filters from '../utils/Filter.js'
import All from '../Charts/All.jsx'
import NavBar from '../components/NavBar'
import {predictNextMonth} from '../utils/Prediction.js'

import TopBar from '../components/TopBar'


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      dayStatistics: [],
      citiesData: [],
      currentCity: "",
      cities: [],
      w: window.innerWidth,
      h: window.innerHeight,
      predict: 0
    }
  }
  componentDidMount () {
    if (this.props.user.data[0] === undefined) { // EMPTY OBJECT
      this.loadData()
    } else {
      this.setState({ data: this.props.user.data }, () => {
        this.getStatistics()
      })
    }
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  predict = (array) => {
    var datasetObject = {}
    array.map((item, index) => {
      let day = Object.keys(item)[0]
      let value = item[day]
      let month = day.split(".")[1]
      if (Object.keys(datasetObject).indexOf(month) != -1){
        datasetObject[month] += value
      } else {
        datasetObject[month] = value
      }
    })
    this.setState({ 
      predict: predictNextMonth(Object.values(datasetObject))
    },() => {
      console.log("prediction", this.state.predict)
    })
  }


  handleResize = () => {
    if (this.state.w !== window.innerWidth) {
      this.setState({
        w: window.innerWidth
      });
    }
  }



  render () {
    let chartWidth = this.state.w <= 1190 ?
    this.state.w <= 498 ? (this.state.w - 50) : (this.state.w - (120 + 50))
      :
    (this.state.w - (120 + 25 + 50)) / 2
    if (this.props.user.user == false) {
       return <Redirect to="/" />
    } else if (this.state.loading){
      return <div>LOADING</div>
    } else {
      return (
        <div className="Home">
            <NavBar
              
            />
            <div className="layout">
              <TopBar 
                predict={this.state.predict}
                data={this.state.dayStatistics}
              />
              <div className="chart-row">
                  <ProgressDays
                    data={this.state.citiesData[this.state.currentCity]}
                    currentCity={this.state.currentCity}
                    cities={this.state.cities}
                    onOptionSelect={this.onOptionSelect}
                    w={chartWidth} h={this.state.h}
                  />
                  <Cities
                    data={this.state.citiesData}
                    w={chartWidth}
                    h={this.state.h}
                  />
              </div>
              <div className="chart-row">
              <MarketingMap
                data={this.state.data.concat(this.state.data)}
                w={chartWidth}
              />
              <All
                data={this.state.dayStatistics}
                w={chartWidth}
                h={this.state.h}
              />
              </div>

            </div>
        </div>
      )
    }
  }

  onOptionSelect = (currentCity) => {
    this.setState({ currentCity })
  }

  loadData = async () => {
    this.setState({ loading: true })
    try {
      var result = []
      const response = await firestore.loadData()
      response.forEach((doc, i) => {
        result.push(doc.data())
      });

      this.props.dispatch({type: "SET_DATA", data: result })
      this.setState({ data: result }, () => {
        this.getStatistics()
      })
    } catch (e) {
      this.showError(e.message, e.message)
    }
  }
  showError = (title, message) => {
    this.setState({ loading: false })
    alert(title)
  }
  getStatistics = () => {
    this.byDay()
    this.getByCity()
  }

  /* getting by days */
  byDay = () => {
    this.setState({
      dayStatistics: Filters.byDay(this.state.data),
      loading: false
    })
    this.predict(Filters.byDay(this.state.data))
  }
  /* City Data */
  getByCity = () => {
    var data = Filters.getByCity(this.state.data)

    this.setState({
      citiesData: data,
      cities: Object.keys(data),
      currentCity: Object.keys(data)[0]
    })
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(Home)
