class Great extends Student {
  constructor(name) {
    const type = 'great'
    const points = 4
    const health = {current: 2, max: 3}
    const img = `<img src="https://media.giphy.com/media/2YsCCJz1Jsjja/giphy.gif">`

    super(name, type, points, health, img)
  }
}

class Good extends Student {
  constructor(name) {
    const type = 'good'
    const points = 3
    const health = {current: 3, max: 5}
    const img = `<img src="https://media.giphy.com/media/11ISwbgCxEzMyY/giphy.gif">`

    super(name, type, points, health, img)
  }
}

class Meh extends Student {
  constructor(name) {
    const type = 'meh'
    const points = 2
    const health = {current: 5, max: 7}
    const img = `<img src="https://media.giphy.com/media/mR5upIOvpPj8I/giphy.gif">`

    super(name, type, points, health, img)
  }
}

class Terrible extends Student {
  constructor(name) {
    const type = 'terrible'
    const points = 1
    const health = {current: 7, max: 9}
    const img = `<img src="https://media.giphy.com/media/xUA7b8yQx8Snn6qMwg/giphy.gif">`

    super(name, type, points, health, img)
  }
}
