

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

const findQuestionByCourse = async(course_id) => { 
    await Question.query().where('course_id', course_id)
   
}


module.exports = {
    insertOne,
    findQuestionByCourse

}