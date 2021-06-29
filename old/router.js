const express= require('express')
const router = express.Router()

router.post('/register', (req,res) => {
    res.send('hello luc dep trai')
})

router.post('/login' , (req,res) => res.send('luc xau trai'))

module.exports = router