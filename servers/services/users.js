
const { User } = require('../db')

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
    .skipUndefined()
    .where('username', '=', username)
    .first()
}

const update = async (id, username, password, email, fullname, admin, position) => {
  await User.query()
    .patch({ username: username, password: password, email: email, fullname: fullname, admin: admin, position: position })
    .where('id', '=', id)
}

const deleteUser = async (id) => {
  await User.query()
    .delete()
    .where('id', '=', id);
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
  update,
  idExists,
  deleteUser,
  findByUsername,
  addOne,
}