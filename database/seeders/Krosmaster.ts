import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Krosmaster from 'App/Models/Krosmaster'

import axios from 'axios'
import cheerio from 'cheerio'
import Env from '@ioc:Adonis/Core/Env'
import Rarity from 'App/Enum/Rarity'
import KrosmasterService from 'App/Services/KrosmasterService'

const getKrosmasterList = async (url) => {
  try {
    const response: any = await axios.get(url)
    const $ = cheerio.load(response.data)
    const nodes = $('a[data-classes]')

    const krosmasters = []

    // const data: any = await getKrosmaster('/profile/s4-ks4-4')
    // console.log('adding...')

    // var kros = Krosmaster.query().where('name', data.name)
    // if (data.version) {
    //   kros.where('version', data.version)
    // }

    // var krosmaster: any = await kros

    // if (!krosmaster[0]) {
    //   console.log('inserting ' + data.name + (data.version ? ' - ' + data.version : ''))
    //   krosmaster = await Krosmaster.create({
    //     name: data.name,
    //     version: data.version,
    //     rarity: data.rarity,
    //   })
    // } else {
    //   console.log('inserted ' + data.name + (data.version ? ' - ' + data.version : ''))
    //   krosmaster = krosmaster[0]
    // }

    for (const node of nodes) {
      const krosmasterLink = $(node).attr('href')
      console.log('catching - ' + krosmasterLink)
      const seasonNumber = $(node).closest('tbody').children().eq(0).text().trim().split(' ')[1]

      const season = await KrosmasterService.createSeason(parseInt(seasonNumber))
      console.log('added season: ' + seasonNumber)

      const collectionName = $(node).closest('tr').children().eq(0).text().trim()

      const collection = await KrosmasterService.createCollection(season.number, collectionName)
      console.log('added collection: ' + collectionName)

      const data: any = await getKrosmaster(krosmasterLink)
      console.log('fetched page: ' + krosmasterLink)

      const krosmaster = await KrosmasterService.createKrosmaster(
        data.name,
        data.rarity,
        collection.name,
        data.version,
        data.description
      )
      console.log(
        'added krosmaster(' + krosmaster.id + '): ' + krosmaster.name + (krosmaster.version ? ' - ' + krosmaster.version : '')
      )

      const card = await KrosmasterService.addCardKrosmaster(
        krosmaster.id,
        data.level,
        data.initiative,
        data.hp,
        data.mp,
        data.ap
      )
      console.log('added card')

      //const data: any = await getKrosmaster(krosmasterLink)
      //console.log('adding...')

      // var kros = Krosmaster.query().where('name', data.name)
      // if (data.version) {
      //   kros.where('version', data.version)
      // }

      // const krosmaster = await kros
      // await krosmaster[0].load('cards')

      // await Krosmaster.updateOrCreate({ path: data.path }, data)
    }

    return krosmasters
  } catch (error) {
    console.error(error)
  }

  return []
}

const getKrosmaster = async (url: string) => {
  try {
    const response = await axios.get(Env.get('KROSARCHIVE') + url)
    const html: any = response.data
    const $ = cheerio.load(html)
    const nameComplete = $('#KrosName').text().trim().split(' - ')
    const name = nameComplete[0]
    const version = nameComplete[1] ? nameComplete[1] : null
    const krosRarity = $('#KrosName').attr('class')

    var rarity: string = 'common'

    if (krosRarity === 'rare-3') {
      rarity = 'rare'
    } else if (krosRarity === 'rare-2') {
      rarity = 'uncommon'
    } else if (krosRarity === 'rare-1') {
      rarity = 'common'
    } else if (krosRarity === 'rare-0') {
      rarity = 'collector'
    }

    const figurine = $('#figurine img').attr('src')

    const level: number = parseInt($('#KrosLvl').text().trim())
    const initiative: number = parseInt($('#KrosInit').text().trim())
    const mp: number = parseInt($('#MP').text().trim())
    const hp: number = parseInt($('#HP').text().trim())
    const ap: number = parseInt($('#AP').text().trim())

    // if (isNaN(Number(ap))) {
    //   ap = null!
    // }

    const loreTitle = $('.lore-title').text().trim()
    const description = $('#description').children().remove().end().text().trim()

    const krosClass = $('#KrosClass > a:first-child').text()

    const path = url

    return {
      name,
      version,
      rarity,
      level,
      initiative,
      mp,
      hp,
      ap,
    }
  } catch (error) {
    throw error
  }
}

export default class KrosmasterSeeder extends BaseSeeder {
  public async run() {
    const url = Env.get('KROSARCHIVE') + '/PT/seasons'
    await getKrosmasterList(url)

    //console.log(await getKrosmaster('/PT/profile/s1-exf-3'))
  }
}
