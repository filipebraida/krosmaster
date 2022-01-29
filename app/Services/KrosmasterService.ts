import Season from 'App/Models/Season'
import Collection from 'App/Models/Collection'
import Krosmaster from 'App/Models/Krosmaster'
import Card from 'App/Models/Card'
import Rarity from 'App/Enum/Rarity'

export default class KrosmasterService {
  public static async createSeason(number: number): Promise<Season> {
    const season = await Season.firstOrCreate({ number: number })

    return season
  }

  public static async createCollection(seasonNumber: number, name: string): Promise<Collection> {
    await Season.findByOrFail('number', seasonNumber)

    const searchPayload = { name: name }
    const savePayload = { season_id: seasonNumber, name: name }

    const collection = await Collection.firstOrCreate(searchPayload, savePayload)

    return collection
  }

  public static async createKrosmaster(
    name: string,
    rarity: Rarity,
    collectionName: string,
    version?: string,
    history?: string
  ): Promise<Krosmaster> {
    const collection = await Collection.findByOrFail('name', collectionName)

    const searchPayload = { name, version }
    const savePayload = { name, rarity, version, history, collection_id: collection.id }

    const krosmaster = await Krosmaster.firstOrCreate(searchPayload, savePayload)

    return krosmaster
  }

  public static async addCardKrosmaster(
    krosmasterId: number,
    level: number,
    initiative: number,
    hp: number,
    mp: number,
    ap: number
  ): Promise<Card> {
    await Krosmaster.findOrFail(krosmasterId)
    const card = await Card.create({
      level,
      initiative,
      hp,
      mp,
      ap,
      krosmasterId,
    })

    return card
  }
}
