import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Krosmasters extends BaseSchema {
  protected tableName = 'krosmasters'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.string('name')
      table.string('figurine')
      table.integer('level')
      table.integer('init')
      table.integer('mp')
      table.integer('hp')
      table.integer('ap')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
