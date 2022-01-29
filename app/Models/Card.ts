import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Krosmaster from 'App/Models/Krosmaster'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public level: number

  @column()
  public initiative: number

  @column()
  public hp: number

  @column()
  public mp: number

  @column()
  public ap: number

  @column()
  public krosmasterId: number

  @belongsTo(() => Krosmaster)
  public krosmaster: BelongsTo<typeof Krosmaster>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
