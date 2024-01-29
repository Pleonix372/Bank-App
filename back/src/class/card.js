class Card {
  static #list = []
  static #receivedList = []
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
    return [...this.#list, ...this.#receivedList].filter(
      (card) => card.userId === userId,
    )
  }

  static getListByReceiverId(userId, type) {
    return this.#list.filter(
      (card) =>
        card.userId === userId && card.type === type,
    )
  }

  static getById(id) {
    const cleanId = Number(id)
    const transaction = [
      ...this.#list,
      ...this.#receivedList,
    ].find((item) => item.id === cleanId)

    return transaction || null
  }

  static getList = () => this.#list

  static createReceived(name, sum, type, userId) {
    const newReceivedCard = new Card(
      name,
      sum,
      'receipt',
      userId,
    )

    this.#receivedList.push(newReceivedCard)

    console.log('newReceivedCard:', newReceivedCard)
    console.log('receivedList:', this.#receivedList)
    return newReceivedCard
  }

  static getReceivedListByUserId(userId) {
    return this.#receivedList.filter(
      (card) => card.userId === userId,
    )
  }
}

module.exports = {
  Card,
}
