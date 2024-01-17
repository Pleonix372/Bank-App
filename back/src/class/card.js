class Card {
  static #list = []
  static #count = 1

  constructor({ name, operation, sign, sum }) {
    this.id = User.#count++

    this.name = name
    this.operation = operation
    this.sign = sign
    this.sum = sum
    this.date = new Date().getTime()
  }

  static create(name, operation, sign, sum) {
    const newCard = new Card(name, operation, sign, sum)

    console.log(newCard)

    this.#list.push(newCard)

    console.log(this.#list)

    return newCard
  }

  static getById(id) {
    return (
      this.#list.find((card) => card.id === Number(id)) ||
      null
    )
  }

  static getList = () => this.#list
}

module.exports = {
  Card,
}
