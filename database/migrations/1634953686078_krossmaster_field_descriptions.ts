import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Krosmasters extends BaseSchema {
  protected tableName = 'krosmasters'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('description', 1024)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, () => {})
  }
}
