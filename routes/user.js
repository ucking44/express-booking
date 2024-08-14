//const express = require('express')
const express = require('express').Router()
//const router = express.Router()

const {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
} = require('../controllers/user')

express.get('/', getUsers)
express.get('/:id', getSingleUser)
express.post('/', createUser)
express.put('/:id', updateUser)
express.delete('/:id', deleteUser)

// router.get('/', getUsers)
// router.get('/:id', getSingleUser)
// router.post('/', createUser)
// router.put('/:id', updateUser)
// router.delete('/:id', deleteUser)



module.exports = express
