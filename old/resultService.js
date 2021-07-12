const { Result } = require('./db')


const addOne = async(mark, status, userId, courseId) => {
    const res = await Result.query().insert({
        mark : mark,
        status: status,
        uId: userId,
        cId: courseId
    })
    console.log(res)
}

// const findListResult = async(userID) => { 
//     const listResult = await Result.query().where('uId', userID)
//     console.log("data : " ,  listResult)
// }

module.exports = {
    addOne,

}