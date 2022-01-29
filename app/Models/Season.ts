import { DateTime } from 'luxon'
import { BaseModel, column, computed, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Collection from 'App/Models/Collection'

export default class Season extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: number

  @computed()
  public get fullName() {
    return `Season ${this.number}`
  }

  @hasMany(() => Collection)
  public collections: HasMany<typeof Collection>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
