class Card {
  static #list = []
  static #count = 1

  constructor(name, sum, type, userId) {
    this.id = Card.#count++

    this.name = name
    this.sum = sum

    this.type = type
    this.date = new Date().getTime()
    this.userId = userId
  }

  static create(name, sum, type, userId) {
    const newCard = new Card(name, sum, type, userId)

    this.#list.push(newCard)

    console.log(this.#list)

    return newCard
  }

  static getListByUserId(userId) {
    return this.#list.filter(
      (card) => card.userId === userId,
    )
  }

  static getById(id) {
    return (
      this.#list.find((item) => item.id === Number(id)) ||
      null
    )
  }

  static getList = () => this.#list
}

module.exports = {
  Card,
}
