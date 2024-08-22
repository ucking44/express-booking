const express = require('express')
const router = express.Router()

const {
    getAllPayments,
    createPayment,
    updatePayment,
    getSinglePayment,
    deletePayment
} = require('../controllers/payment')

router.get('/', getAllPayments)
router.post('/', createPayment)
router.put('/:id', updatePayment)
router.get('/:id', getSinglePayment)
router.delete('/:id', deletePayment)


module.exports = router

