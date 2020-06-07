import React from 'react'
import {
  YMaps, Map,
  Clusterer, Circle,
  Placemark
} from 'react-yandex-maps'
import '../css/Map.css'

export default class MarketingMap extends React.Component {
  render () {
    let points = [[24.5, 54.5], [54.6, 75.3]]
    return (
      <div className="Map neu-card">
        <div className="GraphHeader">
          <h1>Карта</h1>
        </div>
        <YMaps>
          <Map
            width={this.props.w - 60}
            height="300px"
            defaultState={{
              center: [51.100769, 71.440524],
              zoom: 5,
            }}
          >
          <Clusterer
            options={{
              preset: 'islands#invertedRedClusterIcons'
            }}>
              {this.props.data.map((obj, i) =>
                <Placemark
                  geometry={obj.l}
                  options={{preset: 'islands#redIcon'}}
                />
              )}
           </Clusterer>
          </Map>
        </YMaps>
      </div>
    )
  }
}
