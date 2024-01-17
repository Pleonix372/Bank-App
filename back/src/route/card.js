// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { Card } = require('../class/card')

//============================================

router.post('/card-create', (req, res) => {
  try {
    const { name, operation, sign, sum } = req.body

    if (!name || !operation || !sign || !sum) {
      return res.status(400).json({
        message:
          'Потрібно передати всі дані для створення картки',
      })
    }

    let card = null

    // console.log(cardId, 'cardId')

    // if (cardId) {
    //   card = Card.getById(Number(cardId))
    //   console.log('card', card)

    //   if (!card) {
    //     return res.status(400).json({
    //       message: 'Картки з таким ID не існує',
    //     })
    //   }
    // }

    const newCard = Card.create(
      name,
      operation,
      sign,
      sum,
      card,
    )

    return res.status(200).json({
      card: {
        id: newCard.id,
        name: newCard.name,
        operation: newCard.operation,
        sign: newCard.sign,
        sum: newCard.sum,
        date: newCard.date,
      },
    })
  } catch (err) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

// Експортуємо глобальний роутер
module.exports = router
