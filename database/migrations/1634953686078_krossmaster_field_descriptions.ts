import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Krosmaster extends BaseSchema {
  protected tableName = 'krosmaster'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('description', 1024)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, () => {})
  }
}
