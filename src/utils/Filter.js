import * as DayFormatter from './DayFormatter'

export const getByCity = (initialData) => {
  var result = {}
  initialData.map((obj, i) => {
    if (obj.data != undefined) {
      if (result[obj.city] == undefined) {
         result[obj.city] = {
          city: obj.city,
          days: DayFormatter.returnDays(obj.data),
          "Значение": obj.point
        }
      } else {
        result[obj.city]["Значение"] += obj.point
        result[obj.city].days.push(...DayFormatter.returnDays(obj.data))
      }
    } else {
      if (result[obj.city] && result[obj.city].days === undefined) {
        result[obj.city].days = []
      }
    }
  })
  Object.keys(result).map((key, index) => {
    let sortedDays = result[key].days.sort()
    result[key].days = sortedDays
  })

  Object.keys(result).map((key, index) => {
    let object = result[key]
    var normalDays = []
    object.days.map((timestamp, i) => {
     let array = normalDays.filter(dat => dat["День"] == DayFormatter.getDay(timestamp) )
     if (array.length != 0) {
       let index = normalDays.indexOf(array[0])
       normalDays[index]["Значение"] += 1
     } else {
       normalDays.push({
         "День": DayFormatter.getDay(timestamp),
         "Значение": 1
       })
     }
    })
    result[key].days = normalDays
  })

  return result
}





export const byDay = (data) => {
  var array = []
  data.map((obj, i) => {
    if (obj.data !== undefined ) {
      obj.data.map(( simpleObj, k) => {
        let day = DayFormatter.getDay(parseInt(simpleObj.day))
        if (array.filter( obj => obj[day] != undefined).length != 0) {
          var object = array.filter( obj => obj[day] != undefined)[0]
          let index = array.indexOf(object)
          object[day] += 1
          array[index] = object
        } else {
          array = DayFormatter.addAndSort(array, {  [day + ""] : 1 } )
        }
      })
    }
  })
  return array
}
