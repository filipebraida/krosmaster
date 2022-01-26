import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Card from 'App/Models/Card'

enum Rarity {
  common,
  uncommon,
  rare,
  collector,
}

export default class Krosmaster extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Card)
  public cards: HasMany<typeof Card>

  @column()
  public name: string

  @column()
  public version: string | null

  @column()
  public rarity: Rarity

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
