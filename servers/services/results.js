const { Result } = require('../db')


const addOne = async(mark, status, time, userId, courseId) => {
    const res = await Result.query().insert({
        mark : mark,
        status: status,
        time: time,
        uId: userId,
        cId: courseId
    })
    console.log(res)
}

const getResultByMarkDescending =  async() => {
    return Result.query()
      .select('*')
      .orderBy('mark', 'DESC')
  }
module.exports = {
    addOne,
    getResultByMarkDescending

}