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

class Course extends Model {
  static get tableName(){
    return 'courses'
  }
}

async function createTables() {
    const hasSettingTable = await knex.schema.hasTable('program_settings')
    if (!hasSettingTable) {
      await knex.schema.createTable('program_settings', table => {
        table.increments('id').primary()
        table.integer('user_id').references('id').inTable('users')
        table.integer('theme')
      })
    }
  
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


}

module.exports = {
    createTables,
    User,
    Course
}