const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
const db = require('./db')

const router = require('./router')
app.use(cors())
app.use(bodyParser.json())

const port = 8000

app.use(router)
app.listen(port, () => {
  db.createTables()

  console.log(`Example app listening at http://localhost:${port}`)
})