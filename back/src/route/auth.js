// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')

User.create({
  email: 'test@mail.com',
  password: '123qweQWE',
})

// ==============================================================

router.get('/signup', function (req, res) {
  return res.render('signup', {
    name: 'signup',
    component: [
      'button',
      'back-button',
      'field',
      'field-password',
    ],
    title: 'Signup page',
    data: {},
  })
})

//=====

router.post('/signup', function (req, res) {
  const { email, password } = req.body

  console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'Помилка. Такий користувач вже існує',
      })
    }

    const newUser = User.create({ email, password })

    const session = Session.create(newUser)

    Confirm.create(newUser.email)

    return res.status(200).json({
      //   message: 'Користувач успішно зареєстрований',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

//======================================================

router.get('/signup-confirm', function (req, res) {
  //   const { renew, email } = req.query

  //   if (renew) {
  //     Confirm.create(email)  // Відправляє код ще раз
  //   }

  return res.render('signup-confirm', {
    name: 'signup-confirm',
    component: ['button', 'back-button', 'field'],
    title: 'Signup confirm page',
    data: {},
  })
})

//=====

router.post('/signup-confirm', function (req, res) {
  const { code, token } = req.body

  console.log(code, token)

  if (!code || !token) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'Помилка. Ви не увійшли в акаунт',
      })
    }

    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(400).json({
        message: 'Невірний код',
      })
    }

    if (email !== session.user.email) {
      return res.status(400).json({
        message: 'Код не дійсний',
      })
    }

    const user = User.getByEmail(session.user.email)
    user.isConfirm = true
    session.user.isConfirm = true

    // if (!user) {
    //   return res.status(400).json({
    //     message: 'Користувач з таким email не існує',
    //   })
    // }

    return res.status(200).json({
      //   message: 'Пароль змінено',
      session,
    })
  } catch (err) {
    res.status(400).json({
      message: err.message,
    })
  }
})

//======================================================

router.get('/signin', function (req, res) {
  return res.render('signin', {
    name: 'signin',
    component: [
      'button',
      'back-button',
      'field',
      'field-password',
    ],
    title: 'Signin page',
    data: {},
  })
})

//=====

router.post('/signin', function (req, res) {
  const { email, password } = req.body

  console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  console.log(email.password)

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Пароль не вірний',
      })
    }

    const session = Session.create(user)

    return res.status(200).json({
      //   message: 'Ви увійшли в акаунт',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

//======================================================

router.get('/recovery', function (req, res) {
  return res.render('recovery', {
    name: 'recovery',
    component: ['button', 'back-button', 'field'],
    title: 'Recovery page',
    data: {},
  })
})

//=====

router.post('/recovery', function (req, res) {
  const { email } = req.body

  console.log(email)

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові дані відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    Confirm.create(email)

    return res.status(200).json({
      //   message: 'Код для відновлення паролю відправлено',
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

//======================================================

router.get('/recovery-confirm', function (req, res) {
  return res.render('recovery-confirm', {
    name: 'recovery-confirm',
    component: [
      'button',
      'back-button',
      'field',
      'field-password',
    ],
    title: 'Recovery confirm page',
    data: {},
  })
})

//=====

router.post('/recovery-confirm', function (req, res) {
  const { password, code } = req.body

  console.log(password, code)

  if (!code || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(400).json({
        message: 'Такий код не існує',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    user.password = password

    console.log(user)

    const session = Session.create(user)

    return res.status(200).json({
      //   message: 'Пароль змінено',
      session,
    })
  } catch (err) {
    res.status(400).json({
      message: err.message,
    })
  }
})

//======================================================

router.get('/settings', function (req, res) {
  return res.render('settings', {
    name: 'settings',
    component: [
      'button',
      'back-button',
      'field',
      'field-password',
    ],
    title: 'Settings page',
    data: {},
  })
})

//=====

router.post('/settings', function (req, res) {
  const { email, password } = req.body

  console.log(email, password)

  //   if (!code || !password) {
  //     return res.status(400).json({
  //       message: "Помилка. Обов'язкові поля відсутні",
  //     })
  //   }

  //   try {
  //     const email = Confirm.getData(Number(code))

  //     if (!email) {
  //       return res.status(400).json({
  //         message: 'Такий код не існує',
  //       })
  //     }

  //     const user = User.getByEmail(email)

  //     if (!user) {
  //       return res.status(400).json({
  //         message: 'Користувач з таким email не існує',
  //       })
  //     }

  //     user.password = password

  //     console.log(user)

  //     const session = Session.create(user)

  //     return res.status(200).json({
  //       //   message: 'Пароль змінено',
  //       session,
  //     })
  //   } catch (err) {
  //     res.status(400).json({
  //       message: err.message,
  //     })
  //   }
})

//======================================================

module.exports = router
