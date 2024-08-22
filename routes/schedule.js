const express = require('express')
const router = express.Router()

const {
    getSchedules,
    getSingleSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule
} = require('../controllers/schedule')

router.get('/', getSchedules)
router.get('/:id', getSingleSchedule)
router.post('/', createSchedule)
router.put('/:id', updateSchedule)
router.delete('/:id', deleteSchedule)


module.exports = router

