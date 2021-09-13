const { Answer } = require('../db')

const insertOne = async (answer) => {
    const res = await Answer.query().insert({
        content: answer.content, 
        questionId : answer.questionId,
        courseId: answer.courseId
    })
    console.log(res)
}


const deleteAnswersByQId = async (id) => {
    await Answer.query()
        .delete()
        .where('questionId', '=', id);
}

const update = async (answer) => {
    const x = await Answer.query()
        .patch({content: answer.content, questionId: answer.questionId, courseId: answer.courseId})
        .skipUndefined()
        .where('id', '=', answer.id)
    console.log(x)
}


const deleteAnswerById = async (id) => {
    await Answer.query()
        .delete()
        .where('id', '=', id);
}

const deleteAnswerByCourseID = async (id) => {
    await Answer.query()
        .delete()
        .where('courseId', '=', id);
}

module.exports = {
    insertOne,
    deleteAnswersByQId,
    update,
    deleteAnswerById,
    deleteAnswerByCourseID

}