
const { Question } = require('./db')

const insertOne = async (type, content, correct_answer, course_id) => {
    const res = await Question.query().insert({
        type,
        content,
        correct_answer,
        course_id
    })
    console.log(res)
}

const findListQuestion = async (course_id) => {
    const listQuestion = await Question.query().where('course_id', course_id)
    console.log("data : ", listQuestion)
}

const deleteQuestion = async (id) => {
    await Question.query()
        .delete()
        .where('id', '=', id);
}

const update = async (id, type, content, correct_answer, course_id) => {
    const x = await Question.query()
        .patch({type:type, content: content, correct_answer: correct_answer, course_id: course_id})
        .skipUndefined()
        .where('id', '=', id)
    console.log(x)
}


module.exports = {
    insertOne,
    findListQuestion,
    deleteQuestion,
    update
}