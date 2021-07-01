const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const usersService = require('./userService')
const courseSevrvice = require('./courseService')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'HuckFitler'

router.post('/register', async (req, res) => {
  const body = req.body
  const saltRounds = 10

  const user = await usersService.findByUsername(body.username)

  if (user) {
    console.info('User name exist!')
    res.send(400)
    return
  }

  const hash = await hashPromise(body.password, saltRounds)
  const addUser = await usersService.addOne(body.username, hash, body.email, body.fullName, body.position, 0)
  res.send(addUser)


})

router.get('/users', async (req, res) => {
  const users = await usersService.findAll()
  res.send(users)
})


router.post('/users', async (req, res) => {
  const body = req.body
  const saltRounds = 10

  const user = await usersService.findByUsername(body.username)

  if (user) {
    console.info('User name exist!')
    res.send(400)
    return
  }

  const hash = await hashPromise(body.password, saltRounds)
  const addUser = await usersService.addOne(body.username, hash, body.email, body.fullName, body.position, body.admin || 0)
  res.send(addUser)
})

// update users
router.put('/users/update', async (req, res) => {
  const user = req.body
   await usersService.update( user.id,user.username, user.password, user.email, user.fullname, user.admin, user.position).catch(e => { console.error(e) })
  res.send(user)
})

router.post('/login', (req, res) => {
  const user = req.body

  usersService.findByUsername(user.username)
    .then(result => {
      if (!result) {
        console.info('user not found')
        res.send(404)
        return
      }

      bcrypt.compare(user.password, result.password, function (err, fit) {
        if (err) {
          console.error(err)
        }

        if (fit) {
          const token = jwt.sign({ username: user.username }, SECRET_KEY)
          console.info(token)

          const response = {
            token: token,
            isAdmin: result.admin
          }
          res.send(response)
          return
        }
        console.info('Wrong password!')
        res.sendStatus(401)
      })
    })
    .catch(e => {
      console.error(e)
      res.sendStatus(e.statusCode)
    })
})

// get a user by id
router.get('/users/:id', async(req,res) => {
  try {
    const id = req.params.id
    const user = await usersService.findOne(id)
    res.send(user) 

  }catch(err) {
    res.send(err)
  }

})

router.post('/login', (req, res) => res.send('login page'))

const hashPromise = (password, saltRounds) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (e, hash) {
      if (e) {
        console.error(e)
        reject(e)
      }
      resolve(hash)
    })
  })
}


//  function verifyJwt(token) {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, SECRET_KEY, (err, payload) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(payload)
//       }
//     })
//   })
// }
// course 
router.get('/courses', async (_, res) => {
  const courses = await courseSevrvice.findAll().catch(e => { console.error(e) })
  res.send(courses)
})

router.post('/courses', async (req, res) => {
  const course = req.body
  const row = await courseSevrvice.insertOne(course.name, course.descript, course.total_time, course.valid).catch(e => { console.error(e) })
  res.send(row)
  console.log(row)
})


module.exports = router