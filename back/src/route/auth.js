// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/user')

User.create({
  email: 'test@mail.com',
  password: '123qweQWE',
})

// ==============================================================

router.get('/signup', function (req, res) {
  return res.render('signup', {
    name: 'signup',
    component: ['back-button', 'field', 'field-password'],
    title: 'Signup page',
    data: {},
  })
})

router.post('/signup', function (req, res) {
  const { email, password } = req.body

  console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    User.create({ email, password })

    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

module.exports = router
