// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
// const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')

// ==================================

router.get('/user-list', function (req, res) {
  return res.render('user-list', {
    name: 'user-list',
    component: ['back-button'],
    title: 'User list page',
    data: {},
  })
})

// ==================================

router.get('/user-list-data', function (req, res) {
  const list = User.getList()

  console.log(list)

  if (list.length === 0) {
    return res.status(400).json({
      message: 'Список користувачів порожній',
    })
  }

  return res.status(200).json({
    list: list.map(({ id, email, role }) => ({
      id,
      email,
      role,
    })),
  })
})

// ==================================

router.post('/change-email', function (req, res) {
  const { email, password, token } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  if (!token) {
    return res.status(400).json({
      message: 'Помилка. Ви не авторизовані',
    })
  }

  try {
    console.log(`Токен ${token}`)
    const session = Session.get(token)

    if (!session) {
      return res.status(401).json({
        message: 'Сесію не знайдено',
      })
    }

    const currentUserEmail = session.user.email

    console.log('Шукаємо користувача за email:', email)
    const user = User.getByEmail(currentUserEmail)
    console.log('Отримано користувача:', user)

    if (!user) {
      return res.status(400).json({
        message: 'Користувача не знайдено',
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Пароль не вірний',
      })
    }

    if (user.email === email) {
      return res.status(400).json({
        message: 'Ваш email такий самий як і був',
      })
    }

    user.email = email

    console.log(user)

    return res.status(200).json({
      message: 'Ви змінили email',
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ==================================

router.post('/change-password', function (req, res) {
  const { oldPassword, newPassword, token, email } =
    req.body

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  if (!token) {
    return res.status(400).json({
      message: 'Помилка. Ви не авторизовані',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(401).json({
        message: 'Сесію не знайдено',
      })
    }

    const currentUserEmail = session.user.email

    console.log('Шукаємо користувача за email:', email)
    const user = User.getByEmail(currentUserEmail)
    console.log('Отримано користувача:', user)

    if (!user) {
      return res.status(400).json({
        message: 'Користувача не знайдено',
      })
    }

    if (user.password !== oldPassword) {
      return res.status(400).json({
        message: 'Пароль не вірний',
      })
    }

    if (user.password === newPassword) {
      return res.status(400).json({
        message: 'Ваш пароль такий самий як і був',
      })
    }

    user.password = newPassword

    console.log(user, user.password)

    return res.status(200).json({
      message: 'Ви змінили password',
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ==================================

// ==================================

// ==================================

// Експортуємо глобальний роутер
module.exports = router
