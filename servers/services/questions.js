
const { Question, Answer } = require('../db')

const insertOne = async (type, content, correct_answer, course_id) => {
    const question = await Question.query().insert({
        type,
        content,
        correct_answer,
        course_id
    })

    // create default answer correct
    await Answer.query().insert({
        content: question.correct_answer,
        questionId: question.id,
        courseId: course_id
    })
    
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

const deleteQuestionByCourseID = async (id) => {
    await Question.query()
        .delete()
        .where('course_id', '=', id);
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
    deleteQuestionByCourseID,
    deleteQuestion,
    update
}