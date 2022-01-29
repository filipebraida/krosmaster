import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Season from 'App/Models/Season'
import Krosmaster from 'App/Models/Krosmaster'

export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public seasonId: number

  @belongsTo(() => Season)
  public season: BelongsTo<typeof Season>

  @hasMany(() => Krosmaster)
  public krosmasters: HasMany<typeof Krosmaster>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
