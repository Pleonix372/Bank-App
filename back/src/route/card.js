// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Card } = require('../class/card')
const { Session } = require('../class/session')
const { Notification } = require('../class/notification')

//========================================

router.get('/receive', function (req, res) {
  try {
    const userId = Number(req.query.userId)
    console.log('userId:', userId)
    const list = Card.getListByUserId(userId)

    if (list.length === 0) {
      return res.status(200).json({
        list: [],
      })
    }

    return res.status(200).json({
      list: list.map(
        ({ id, name, sum, type, date, userId }) => ({
          id,
          name,
          sum,
          type,
          date,
          userId,
        }),
      ),
    })
  } catch (e) {
    console.error('Backend error:', e)
    return res.status(400).json({
      message: e.message,
    })
  }
})

//========================================

router.post('/receive', async function (req, res) {
  try {
    const { name, type, sum, token, userId } = req.body
    console.log('Receive userId:', userId)

    console.log(`Токен ${token}`)
    const session = Session.get(token)

    if (!session) {
      return res.status(401).json({
        message: 'Сесію не знайдено',
      })
    }

    if (!name || !sum || !type) {
      return res.status(400).json({
        message:
          'Потрібно передати всі дані для створення переказу',
      })
    }

    const newCard = Card.create(name, sum, type, userId)

    return res.status(200).json({
      Card: {
        id: newCard.id,
        name: newCard.name,
        sum: newCard.sum,
        type: newCard.type,
        date: newCard.date,
        userId: newCard.userId,
      },
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

//========================================

router.post('/send', function (req, res) {
  const { name, sum, token, userId, cardId } = req.body

  console.log(name, sum, token)

  if (!name || !sum) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  if (Number(sum) === 0) {
    return res.status(400).json({
      message:
        'Помилка. Сума відправлення повинна бути більше 0',
    })
  }

  try {
    console.log(`Токен ${token}`)
    const currentUser = User.getById(userId)

    if (!currentUser) {
      return res.status(400).json({
        message: 'Користувача не знайдено',
      })
    }

    if (currentUser.email === name) {
      return res.status(400).json({
        message:
          'Ви не можете відправити переказ на свій рахунок',
      })
    }

    const recipientUser = User.getByEmail(name)

    if (!recipientUser) {
      return res.status(400).json({
        message: 'Помилка. Адресата не існує',
      })
    }

    const newCardSent = Card.create(
      name,
      sum,
      'sending',
      userId,
    )

    const recipientUserId = recipientUser.id

    const newCardReceived = Card.create(
      currentUser.email,
      sum,
      'receipt',
      recipientUserId,
    )

    return res.status(200).json({
      CardSent: {
        id: newCardSent.id,
        name: newCardSent.name,
        sum: newCardSent.sum,
        type: newCardSent.type,
        date: newCardSent.date,
      },
      CardReceived: {
        id: newCardReceived.id,
        name: newCardReceived.name,
        sum: newCardReceived.sum,
        type: newCardReceived.type,
        date: newCardReceived.date,
      },
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

//==================================================

router.get('/balance', function (req, res) {
  try {
    const userId = Number(req.query.userId)
    console.log('userId:', userId)
    const list = Card.getListByUserId(userId)

    if (list.length === 0) {
      return res.status(200).json({
        list: [],
        balance: 0,
      })
    }

    const balance = list.reduce((acc, { type, sum }) => {
      const numericSum = parseFloat(sum)

      if (type === 'receipt' && !isNaN(numericSum)) {
        return acc + numericSum
      } else if (type === 'sending' && !isNaN(numericSum)) {
        return acc - numericSum
      }
      return acc
    }, 0)

    const totalBalance = parseFloat(balance.toFixed(2))

    return res.status(200).json({
      list: list.map(
        ({ id, name, sum, type, date, userId }) => ({
          id,
          name,
          sum,
          type,
          date,
          userId,
        }),
      ),
      balance: totalBalance,
    })
  } catch (e) {
    console.error('Backend error:', e) //
    return res.status(400).json({
      message: e.message,
    })
  }
})

//==================================================

router.get('/transaction/:id', function (req, res) {
  const { id } = req.params

  try {
    const cleanId = id.replace(/^:/, '')
    const transaction = Card.getById(Number(cleanId))

    if (!transaction) {
      return res.status(404).json({
        message: 'Платіж за таким ID не знайдено',
      })
    }

    return res.status(200).json({
      transaction: {
        id: transaction.id,
        name: transaction.name,
        sum: transaction.sum,
        type: transaction.type,
        date: transaction.date,
      },
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

//==================================================

router.get('/notifications', function (req, res) {
  const userId = Number(req.query.userId)

  if (!userId) {
    throw new Error('userId is required')
  }

  const userNotifications =
    Notification.getListByUserId(userId)
  res.json({ list: userNotifications })
})

//========================================

router.get(
  '/notifications/change-password',
  function (req, res) {
    const userId = Number(req.query.userId)

    if (!userId) {
      throw new Error('userId is required')
    }

    try {
      Notification.create(
        'Change password',
        'warning',
        userId,
      )

      return res.status(200).json({
        message: 'Ваш пароль змінено',
      })
    } catch (e) {
      return res.status(400).json({
        message: e.message,
      })
    }
  },
)

//========================================

router.get(
  '/notifications/change-email',
  function (req, res) {
    const userId = Number(req.query.userId)

    if (!userId) {
      throw new Error('userId is required')
    }

    try {
      Notification.create('Change email', 'warning', userId)

      return res.status(200).json({
        message: 'Ваш email змінено',
      })
    } catch (e) {
      return res.status(400).json({
        message: e.message,
      })
    }
  },
)

//========================================

router.get(
  '/notifications/transaction-receive',
  function (req, res) {
    const userId = Number(req.query.userId)

    if (!userId) {
      throw new Error('userId is required')
    }

    try {
      Notification.create(
        'The account was replenished',
        'announcement',
        userId,
      )

      return res.status(200).json({
        message: 'Ваш рахунок поповнено',
      })
    } catch (e) {
      return res.status(400).json({
        message: e.message,
      })
    }
  },
)

//========================================

router.get(
  '/notifications/transaction-getting',
  function (req, res) {
    const userId = Number(req.query.userId)

    if (!userId) {
      throw new Error('userId is required')
    }

    try {
      Notification.create(
        'Receiving a transaction',
        'announcement',
        userId,
      )

      return res.status(200).json({
        message: 'Ваш надійшов переказ',
      })
    } catch (e) {
      return res.status(400).json({
        message: e.message,
      })
    }
  },
)

//========================================

router.get(
  '/notifications/transaction-send',
  function (req, res) {
    const userId = Number(req.query.userId)

    if (!userId) {
      throw new Error('userId is required')
    }

    try {
      Notification.create(
        'Sending a transaction',
        'announcement',
        userId,
      )

      return res.status(200).json({
        message: 'Переказ відправлено',
      })
    } catch (e) {
      return res.status(400).json({
        message: e.message,
      })
    }
  },
)

//========================================

router.get('/recipient-info', function (req, res) {
  const recipientEmail = req.query.email

  if (!recipientEmail) {
    return res.status(400).json({
      message: 'Email is required',
    })
  }

  const recipientUser = User.getByEmail(recipientEmail)

  if (!recipientUser) {
    return res.status(404).json({
      message: 'Recipient not found',
    })
  }

  const recipientInfo = {
    userId: recipientUser.id,
    email: recipientUser.email,
  }

  res.json(recipientInfo)
})

// Експортуємо глобальний роутер
module.exports = router
