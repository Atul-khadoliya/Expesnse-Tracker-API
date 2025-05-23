const { addExpense, updateExpense, deleteExpense, getExpense } = require('../controllers/expense')
const express = require('express')
const router = express.Router()

router.post('/', addExpense)
router.put('/:id', updateExpense)
router.get('/', getExpense)
router.delete('/:id', deleteExpense)

module.exports = router
