import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Krosmaster from 'App/Models/Krosmaster'

import axios from 'axios'
import cheerio from 'cheerio'
import Env from '@ioc:Adonis/Core/Env'

const getKrosmasterList = async (url) => {
  try {
    const response: any = await axios.get(url)
    const $ = cheerio.load(response.data)
    const nodes = $('a[data-classes]')

    const krosmasters = []

    for (const node of nodes) {
      const krosmasterLink = $(node).attr('href')
      console.log('catching - ' + krosmasterLink)
      const data: any = await getKrosmaster(krosmasterLink)
      console.log('adding...')

      await Krosmaster.updateOrCreate({ path: data.path }, data)
    }

    return krosmasters
  } catch (error) {
    console.error(error)
  }

  return []
}

const getKrosmaster = async (url) => {
  try {
    const response = await axios.get(Env.get('KROSARCHIVE') + url)
    const html: any = response.data
    const $ = cheerio.load(html)
    const name = $('#KrosName').text().trim()
    const level = $('#KrosLvl').text().trim()
    const figurine = $('#figurine img').attr('src')
    const init = $('#KrosInit').text().trim()
    const mp = $('#MP').text().trim()
    const hp = $('#HP').text().trim()
    const ap = $('#AP').text().trim()
    const loreTitle = $('.lore-title').text().trim()
    const description = $('#description').children().remove().end().text().trim()

    const krosClass = $('#KrosClass > a:first-child').text()

    const path = url

    return {
      name,
      level,
      figurine,
      init,
      mp,
      hp,
      ap,
      loreTitle,
      description,
      krosClass,
      path,
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
