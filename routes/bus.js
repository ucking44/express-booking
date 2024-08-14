const express = require('express')
const router = express.Router()

const {
    getAllBuses,
    getSingleBus,
    createBus,
    updateBus,
    deleteBus
} = require('../controllers/bus')

router.get('/', getAllBuses)
router.get('/:id', getSingleBus)
router.post('/', createBus)
router.put('/:id', updateBus)
router.delete('/:id', deleteBus)



module.exports = router

