const { Answer } = require('./db')

const insertOne = async (answer) => {
    const res = await Answer.query().insert(answer)
    console.log(res)
}


const deleteAnswersByQId = async (id) => {
    await Answer.query()
        .delete()
        .where('questionId', '=', id);
}



module.exports = {
    insertOne,
    deleteAnswersByQId

}