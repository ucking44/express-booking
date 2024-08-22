const express = require('express')
const router = express.Router()

const {
    getCustomers,
    createCustomer,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customer')

router.get('/', getCustomers)
router.post('/', createCustomer)
router.get('/:id', getSingleCustomer)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)


module.exports = router

