const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()



const router = require('./router')
app.use(cors())
app.use(bodyParser.json())

const port = 8000

app.get('/',(req,res)=> {
    res.send('Hello world')
})
app.use(router)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })