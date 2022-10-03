export default class Logic {
  slots
  usedColors
  #target
  #allowMultiple

  startGame({ colors = 6, slots = 4, allowMultiple = false }) {
    this.slots = slots
    this.#allowMultiple = allowMultiple
    this.usedColors = this.#allColors.slice(0, colors)
    this.#target = this.getRandomSet()
  }

  check(array) {
    if (array.length !== this.slots) throw "Wrong guess length"
    let position = 0
    let color = 0
    for (let i = 0; i < array.length; i++) {
      if (array[i] === this.#target[i]) position++
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

  getRandomSet() {
    let colorsCopy = [...this.usedColors]
    if (this.#allowMultiple) colorsCopy = colorsCopy.concat(colorsCopy)
    if (colorsCopy.length < this.slots) throw "Not enough colors"
    let set = []
    while (set.length !== this.slots) {
      const idx = Math.floor(Math.random() * colorsCopy.length)
      set.push(colorsCopy[idx])
      colorsCopy.splice(idx, 1)
    }
    return set
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
    "purple",
    "cyan"
  ]
}
