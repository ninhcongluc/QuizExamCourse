const express= require('express')
const router = express.Router()

router.post('/register', (req,res) => {
    res.send('register page')
})

router.post('/login' , (req,res) => res.send('login page'))

module.exports = router