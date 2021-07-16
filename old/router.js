const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const usersService = require('./userService')
const courseSevrvice = require('./courseService')
const questionService = require('./questionService')
const answerService = require('./answerService')
const resultService = require('./resultService')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'Doraemon'

const { Question, Result } = require('./db')
const { Answer } = require('./db')



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
  const saltRounds = 10
  const hash = await hashPromise(user.password, saltRounds)
  await usersService.update(user.id, user.username, hash, user.email, user.fullname, user.admin, user.position).catch(e => { console.error(e) })
  res.send(user)
})

//delete user 
router.delete('/users/delete/:id', async (req, res) => {
  const response = await usersService.deleteUser(req.params.id)
  res.send(response)
})



router.post('/login', (req, res) => {
  const user = req.body

  usersService.findByUsername(user.username)
    .then(result => {
      if (!result) {
        res.send(404)
        return
      }

      bcrypt.compare(user.password, result.password, function (err, fit) {
        if (err) {
          return res.status(401).json({
            tite: 'login failed',
            error: 'invalid credentials'
          })
        }

        if (fit) {
          const token = jwt.sign({ userId: user.id }, SECRET_KEY)
          return res.status(200).json({
            title: 'login sucess',
            token: token
          })
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
router.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await usersService.findOne(id)
    res.send(user)

  } catch (err) {
    res.send(err)
  }

})



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


// course 
router.get('/courses', async (_, res) => {
  const courses = await courseSevrvice.findAll().catch(e => { console.error(e) })
  res.send(courses)
})

router.post('/courses', async (req, res) => {
  const course = req.body
  const row = await courseSevrvice.insertOne(course.name, course.descript, course.total_time, course.valid, course.status).catch(e => { console.error(e) })
  res.send(row)
  console.log(row)
})
// get a course by id

router.get('/courses/:id', async (req, res) => {
  try {
    const id = req.params.id
    const course = await courseSevrvice.findOne(id)
    res.send(course)

  } catch (err) {
    res.send(err)
  }

})

router.put('/courses/update', async (req, res) => {
  const course = req.body
  await courseSevrvice.update(course.id, course.name, course.descript, course.total_time, course.valid, course.status).catch(e => { console.error(e) })
  res.send(course)
})

// delte course (delete course , question of course , answer of course)
router.delete('/courses/delete/:id', async (req,res) => {
  const response = await courseSevrvice.deleteCourse(req.params.id)
  res.send(response)
})
// question of courseID
router.delete('/questions/delete/:id', async (req,res) => {
  const response = await questionService.deleteQuestionByCourseID(req.params.id)
  res.send(response)
})
// answers by courseID
router.delete('/answers/delete/:id', async (req,res) => {
  const response = await answerService.deleteAnswerByCourseID(req.params.id)
  res.send(response)
})



router.post('/questions', async (req, res) => {
  const q = req.body
  const row = await questionService.insertOne(q.type, q.content, q.correct_answer, q.course_id).catch(e => { console.error(e) })
  res.send(row)
})

// get question by course
router.get('/questions/:id', async (req, res) => {
  try {
    const id = req.params.id
    const questions = await Question.query().where('course_id', id)
    res.send(questions)

  } catch (err) {
    res.send(err)
  }

})

// get answers by courseId
router.get('/answers/:id', async (req, res) => {
  try {
    const id = req.params.id
    const answers = await Answer.query().where('courseId', id)
    res.send(answers)

  } catch (err) {
    res.send(err)
  }

})

router.post('/results', async (req, res) => {
  const result = req.body
  console.log(result)
  const rs = await resultService.addOne(result.mark, result.status, result.time, result.userID, result.courseID).catch(e => { console.error(e) })
  res.send(rs)

})

router.get('/detail/:id', async (req, res) => {
  try {
    const id = req.params.id
    const results = await Result.query().where('uId', id)
    res.send(results)

  } catch (err) {
    res.send(err)
  }

})

// get answers by question id
router.get('/admin/answers/:id', async (req, res) => {
  try {
    const id = req.params.id
    const answers = await Answer.query().where('questionId', id)
    res.send(answers)

  } catch (err) {
    res.send(err)
  }

})

// delete question
router.delete('/admin/delete_question/:id',async(req,res) =>{
  const response = await questionService.deleteQuestion(req.params.id)
  res.send(response)
})

// get question by id
router.get('/question/:id', async (req, res) => {
  try {
    const id = req.params.id
    const questions = await Question.query().findById(id)
    res.send(questions)
  } catch (err) {
    res.send(err)
  }
})

// update question
router.put('/question/update', async (req, res) => {
  const question = req.body
  console.log(question)
  await questionService.update(question.id, question.type, question.content, question.correct_answer, question.course_id).catch(e => { console.error(e) })
  res.send(question)
})
// delete answers of question
router.delete('/admin/delete_answers/:id',async(req,res) =>{
  const response = await answerService.deleteAnswersByQId(req.params.id)
  res.send(response)
})
// insert answer to question
router.post('/answers', async (req, res) => {
  const answer = req.body
  const row = await answerService.insertOne(answer).catch(e => { console.error(e) })
  res.send(row)
})


// get answer by answerID

router.get('/answer/:id', async (req, res) => {
  try {
    const id = req.params.id
    const answer = await Answer.query().findById(id)
    res.send(answer)
  } catch (err) {
    res.send(err)
  }
})

// update answer by admin
router.put('/answer/update', async (req, res) => {
  const answer = req.body
  await answerService.update(answer).catch(e => { console.error(e) })
  res.send(answer)
})

// delete answer by id
router.delete('/admin/delete_answer/:id',async(req,res) =>{
  const response = await answerService.deleteAnswerById(req.params.id)
  res.send(response)
})

// get results by mark desc
router.get('/results', async(req, res) => {
   const results = await resultService.getResultByMarkDescending()
   res.send(results)
})
module.exports = router