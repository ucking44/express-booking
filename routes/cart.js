const express = require('express')
//const express = require('express').Router()
const router = express.Router()


const {
    getCartItem,
    createCart,
    updateCart,
    deleteCart
} = require('../controllers/cart')

router.get('/:user_id', getCartItem)
router.post('/', createCart)
router.put('/:id', updateCart)
router.delete('/:id', deleteCart)


module.exports = router

