import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cards extends BaseSchema {
  protected tableName = 'cards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('level').unsigned().notNullable()
      table.integer('initiative').unsigned().notNullable()
      table.integer('mp').unsigned().notNullable()
      table.integer('hp').unsigned().notNullable()
      table.integer('ap').unsigned().notNullable()
      table
        .integer('krosmaster_id')
        .unsigned()
        .notNullable()
        .references('krosmaster.id')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
