import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Krosmasters extends BaseSchema {
  protected tableName = 'krosmasters'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('lore_title')
      table.string('description')
      table.string('kros_class')
      table.string('path').unique()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
    })
  }
}
