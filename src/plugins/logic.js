export default class Logic {
  slots
  usedColors
  #target

  startGame({ colors = 6, slots = 4, allowMultiple = false }) {
    console.log("sg", colors, slots, allowMultiple)
    this.slots = slots
    this.usedColors = this.#allColors.slice(0, colors)
    let colorsCopy = this.#shuffle([...this.usedColors])
    this.#target = []
    //todo allowmultiple
    for (let index = 0; index < slots; index++) {
      this.#target.push(colorsCopy.pop())
    }
  }

  check(array) {
    if (array.length != this.slots) throw "Wrong guess length"
    let position = 0
    let color = 0
    for (let i = 0; i < array.length; i++) {
      if (array[i] == this.#target[i]) position++
    }
    let t = [...this.#target]
    for (let i = 0; i < array.length; i++) {
      if (t.includes(array[i])) {
        t.splice(t.indexOf(array[i]), 1)
        color++
      }
    }
    color = color - position
    return { colors: array, position, color }
  }

  #shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ]
    }

    return array
  }

  #allColors = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "white",
    "black",
    "pink",
    "brown",
    "magenta",
    "cyan"
  ]
}
