class Notification {
  static #list = []
  static #count = 1

  constructor(name, type, userId) {
    this.id = Notification.#count++
    this.name = name
    this.type = type
    this.date = new Date().getTime()
    this.userId = userId
  }

  static create(name, type, userId) {
    const newNotification = new Notification(
      name,
      type,
      userId,
    )

    this.#list.push(newNotification)

    console.log(this.#list)

    return newNotification
  }

  static getListByUserId(userId) {
    return this.#list.filter(
      (notification) => notification.userId === userId,
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
  Notification,
}
