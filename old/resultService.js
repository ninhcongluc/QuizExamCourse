const { Result } = require('./db')


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

// const findListResult = async(userID) => { 
//     const listResult = await Result.query().where('uId', userID)
//     console.log("data : " ,  listResult)
// }


// get Result by score desc

const getResultByMarkDescending =  async() => {
    return Result.query()
      .select('*')
      .skipUndefined()
      .orderBy('mark', 'DESC')
  }
module.exports = {
    addOne,
    getResultByMarkDescending

}