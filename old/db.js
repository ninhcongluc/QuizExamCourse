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

class ProgramSetting extends Model {
  static get tableName() {
    return 'program_settings'
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'program_settings.user_id',
          to: 'user.id'
        }
      }
    }
  }
}

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    return {
      setting: {
        relation: Model.HasOneRelation,
        modelClass: ProgramSetting,
        join: {
          from: 'users.id',
          to: 'program_settings.user_id'
        }
      }
    }
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
        table.string('firstName')
        table.string('lastName')
        table.string('email')
        table.string('password')
      })
    }


}

module.exports = {
    createTables,
    User,
    ProgramSetting
}