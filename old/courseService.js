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

const update = async (id, name,descript, total_time, valid) => {
  await Course.query()
    .patch({name: name,descript: descript, total_time: total_time, valid: valid})
    .skipUndefined()
    .where('id', '=', id)
}

const findOne = (id) => {
  return Course.query().findById(id)
}

const deleteCourse = async(id) => {
  await Course.query()
  .delete()
  .where('id', '=', id);
}



module.exports = {
  findAll,
  insertOne,
  findOne,
  deleteCourse,
  update
}