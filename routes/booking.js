const express = require('express')
const router = express.Router()

const {
    getAllBookings,
    createBooking,
    getSingleBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/booking')

router.get('/', getAllBookings)
router.post('/', createBooking)
router.get('/:id', getSingleBooking)
router.put('/:id', updateBooking)
router.delete('/:id', deleteBooking)



module.exports = router

