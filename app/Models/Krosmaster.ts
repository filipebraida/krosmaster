import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  belongsTo,
  BelongsTo,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import Card from 'App/Models/Card'
import Collection from 'App/Models/Collection'
import Rarity from 'App/Enum/Rarity'

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

  @column()
  public history: string | null

  @column()
  public collectionId: number

  @belongsTo(() => Collection)
  public collection: BelongsTo<typeof Collection>

  @computed()
  public get fullName() {
    return this.version ? `${this.name} - ${this.version}` : this.name
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
