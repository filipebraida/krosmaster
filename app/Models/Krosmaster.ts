import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

import Env from '@ioc:Adonis/Core/Env'

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
  public init: number

  @column()
  public mp: number

  @column()
  public hp: number

  @column()
  public ap: number

  @column()
  public path: string

  @column()
  public loreTitle: string

  @column()
  public description: string

  @column()
  public krosClass: string

  @computed()
  public get figurineUrl() {
    return Env.get('KROSARCHIVE') + this.figurine
  }

  @computed()
  public get url() {
    return Env.get('KROSARCHIVE') + this.path
  }

  @computed()
  public get descriptionTruncate() {
    const text = this.loreTitle + ' ' + this.description
    return text.substring(0, 100) + '...'
  }
}
