const { Model } = require('objection');
const Knex = require('knex');

// const knex = Knex(require('./config.db'))
const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: 'app.db'
  }
})

Model.knex(knex)


class User extends Model {
  static get tableName() {
    return 'users'
  }
}

class Answer extends Model {
  static get tableName() {
    return 'answers'
  }
}

class Question extends Model {
  static get tableName() {
    return 'questions'
  };
  static relationMappings = {
    answers: {
      relation: Model.HasManyRelation,
      modelClass: Answer,
      join: {
        from: 'questions.id',
        to: 'answers.questionId'
      }
    }
  }
}

class Course extends Model {
  static get tableName() {
    return 'courses'
  };
  static relationMappings = {
    questions: {
      relation: Model.HasManyRelation,
      modelClass: Question,
      join: {
        from: 'courses.id',
        to: 'questions.course_id'
      }
    }
  }
}

async function createTables() {

  const hasUserTable = await knex.schema.hasTable('users')
  if (!hasUserTable) {
    await knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('username')
      table.string('password')
      table.string('email')
      table.string('fullname')
      table.integer('admin')
      table.string('position')
    })
  }

  const hasQuestionTable = await knex.schema.hasTable('questions')
  if (!hasQuestionTable) {
    await knex.schema.createTable('questions', table => {
      table.increments('id').primary()
      table.string('type')
      table.string('content')
      table.string('correct_answer')
      table.integer('course_id').references('id').inTable('courses')
    })
  }

  const hasCourseTable = await knex.schema.hasTable('courses')
  if (!hasCourseTable) {
    await knex.schema.createTable('courses', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('descript')
      table.int('total_time')
      table.int('valid')
    })
  }

  const hasAnswerTable = await knex.schema.hasTable('answers')
  if (!hasAnswerTable) {
    await knex.schema.createTable('answers', table => {
      table.increments('id').primary()
      table.string('content')
      table.integer('questionId').references('id').inTable('questions')
    })
  }


}




module.exports = {
  createTables,
  Answer,
  User,
  Course,
  Question
}