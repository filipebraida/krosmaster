import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Krosmaster extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column()
  public figurine: string

  @column()
  public level: string

  @column()
  public init: int

  @column()
  public mp: int

  @column()
  public hp: int

  @column()
  public ap: int
}
