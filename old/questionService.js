

const { Question } = require('./db')

const insertOne = async(type, content, correct_answer, course_id) => {
    const res = await Question.query().insert({
        type: type,
        content: content,
        correct_answer: correct_answer,
        course_id: course_id
    })
    console.log(res)
}


module.exports = {
    insertOne

}