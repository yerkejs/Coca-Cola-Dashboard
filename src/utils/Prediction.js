
function findMidX (dataset) {
    return (dataset.length + 1.0) / 2
}

function findMidY (dataset) {
    var sum = 0
        dataset.forEach(item => {
        sum += item
    })
    return sum / dataset.length
}

function findTop (dataset, midX, midY) {
    var sum = 0
    var array = []
    dataset.map((item, index) => {
      array.push((index + 1.0 - midX) * (item - midY))
    })
    array.forEach(el => {
      sum += el
    }) 
    return sum
  }
  function findBottom (dataset, midX) {
    var sum = 0
    var array = []
    dataset.map((item, index) => {
      var num = (index + 1 - midX) ** 2
      array.push(num)
    })
    array.forEach(el => {
      sum += el
    })
    return sum
  }



export const predictNextMonth = (data) => {
    let dataset = data  

    let midX = findMidX(dataset)
    let midY = findMidY(dataset)


    let top = findTop(dataset, midX, midY)
    let bottom = findBottom(dataset, midX)


    let k = top / bottom
    let x = (dataset[dataset.length - 1] / k) + 1
 
    return Math.round(k * x)
}