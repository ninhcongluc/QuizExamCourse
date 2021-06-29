
const { User } = require('./db')

const idExists = (id) => {
  return User.query().findById(id)
}

const findAll = () => {
  return User.query().execute()
}

const findOne = (id) => {
  return User.query().findById(id)
}

const findByUsername = (username) => {
  return User.query()
    .select('*')
    .where('username', '=', username)
    .first()
}

const addOne = (username, password, email, fullname, position, admin) => {
  return User.query().insert({
      username: username,
      password: password,
      email: email,
      fullname: fullname,
      position: position,
      admin: admin,
  })
}

module.exports = {
  findAll,
  findOne,
  idExists,
  findByUsername,
  addOne,
}