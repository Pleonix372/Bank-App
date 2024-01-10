// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const user = require('./user')
// Підключіть інші файли роутів, якщо є
const user = require('./auth')

// Об'єднайте файли роутів за потреби
router.use('/', user)
// Використовуйте інші файли роутів, якщо є
router.use('/', auth)

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

// Експортуємо глобальний роутер
module.exports = router
