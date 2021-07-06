

const { Question } = require('./db')

const insertOne = async(type, content, correct_answer, course_id) => {
    const res = await Question.query().insert({
        type,
        content,
        correct_answer,
        course_id
    })
    console.log(res)
}

const findListQuestion = async(course_id) => { 
    const listQuestion = await Question.query().where('course_id', course_id)
    console.log("data : " ,  listQuestion)
}


module.exports = {
    insertOne,
    findListQuestion
}