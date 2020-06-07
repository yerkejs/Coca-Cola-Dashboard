export const getDay = (date) => {
  var newDate = new Date(date)
  let day = newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate()
  let month = newDate.getMonth() + 1 > 9 ? newDate.getMonth() + 1 : "0" + (newDate.getMonth() + 1)
  return day + "." + month + "." + newDate.getFullYear()
}
export const returnDays = (array) => {
  var output = []
  array.map((item, i) => {
    output.push(item.day)
  })
  return output
}

export const addAndSort = (arr, val) => {
    arr.push(val);
    var i = arr.length - 1;
    var item = arr[i];
    while (i > 0 && isAfter(Object.keys(item)[0], Object.keys(arr[i-1])[0])) {
        arr[i] = arr[i-1];
        i -= 1;
    }
    arr[i] = item;
    return arr;
}






export const addAndSort2 = (arr, val) => {
    arr.push(val);
    var i = arr.length - 1;
    var item = arr[i];
    while (i > 0 && item < arr[i-1]) {
        arr[i] = arr[i-1];
        i -= 1;
    }
    arr[i] = item;
    return arr;
}
export const isAfter = (date1, date2) => {
  var first = date1.split(".")
  var second = date2.split(".") // day, month, year
  var isAfter = false
  var day1 = parseInt(first[0])
  var day2 = parseInt(second[0])
  var month1 = parseInt(first[1])
  var month2 = parseInt(second[1])
  var year1 = parseInt(first[2])
  var year2 = parseInt(second[2])

  if (year2 > year1) {
      isAfter = true
  } else if (year2 == year1) {
    // check months
    if (month2 > month1) {
      isAfter = true
    } else if (month2 == month1) {
      if (day2 > day1) {
        isAfter = true
      }
    }
  }
  return isAfter
}
export const toDays = (data) => {
  var result = []
  data.map(( object , i) => {
    let newObject = {
      "День": Object.keys(object)[0],
      "Значение": Object.values(object)[0]
    }
    result.push(newObject)
  })
  return result
}
export const toMonth = (data) => {
  var result = []
  data.map(( object , i) => {
    var day = Object.keys(object)[0]
    var coins = Object.values(object)[0]
    var month = getMonth(day)
    var previousObject = result.filter(obj => obj["Месяц"] === month )
    if (previousObject.length === 0 ) {
      var newObject = {
        "Месяц": month,
        "Значение": coins
      }
      result.push(newObject)
    } else {
      var needObject = previousObject[0]
      var index = result.indexOf(needObject)
      needObject["Значение"] += coins
      result[index] = needObject
    }
  })
  return result
}
function getMonth(day) {
  const monthsNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
  var month = parseInt(day.split(".")[1])
  return monthsNames[month - 1]
}
export const getToday = () => {
  var date = new Date ()
  let year = date.getFullYear()
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  return day + "." + month + '.' + year
}
export const getCurrentMonth = () => {
  var date = new Date ()
  let month = date.getMonth()
  const monthsNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]

  var previous = month === 0 ? false : monthsNames[month - 1]
  var current = monthsNames[month]

  return [previous, current]
}
