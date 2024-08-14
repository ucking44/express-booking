const express = require('express')
const router = express.Router()

const {
    getAllDrivers,
    singleDriver,
    createDriver,
    updateDriver,
    deleteDriver
} = require('../controllers/driver')

router.get('/', getAllDrivers)
router.get('/:id', singleDriver)
router.post('/', createDriver)
router.put('/:id', updateDriver)
router.delete('/:id', deleteDriver)

module.exports = router

