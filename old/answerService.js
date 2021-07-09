const { Answer } = require('./db')

const insertOne = async (answer) => {
    const res = await Answer.query().insert(answer)
    console.log(res)
}





module.exports = {
    insertOne

}