// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// ==================================

router.get('/', (req, res) => {
  res.render('index', {
    name: 'index',
    component: [''],
    title: 'Home',
    data: {},
  })
})

// ==================================

router.get('/signup', (req, res) => {
  res.render('signup', {
    name: 'signup',
    component: [],
    title: 'Sign Up',
    data: {},
  })
})

// Експортуємо глобальний роутер
module.exports = router
