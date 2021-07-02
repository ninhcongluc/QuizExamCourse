const { Course } = require('./db')

const findAll = () => {
  return Course.query().execute()
}

const insertOne = async (name, descript, total_time, valid) => {
  return await Course.query().insert({
    name: name,
    descript: descript,
    total_time: total_time,
    valid: valid
  })
}

const update = async (id, name, total_time, valid) => {
  await Course.query()
    .patch({name: name, total_time: total_time, valid: valid})
    .skipUndefined()
    .where('id', '=', id)
}


module.exports = {
  findAll,
  insertOne,

  update
}