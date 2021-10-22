import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Krosmaster from 'App/Models/Krosmaster'

import axios from 'axios'
import cheerio from 'cheerio'

const host = 'https://krosarchive.es'

const urlList = host + '/PT/seasons'

const getKrosmasterList = async (url) => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    const nodes = $('a[data-classes]')

    const krosmasters = []

    for (const node of nodes) {
      const krosmasterLink = $(node).attr('href')
      console.log('catching - ' + krosmasterLink)
      const data = await getKrosmaster(host + krosmasterLink)
      console.log('adding...')

      const krosmaster = new Krosmaster()

      await krosmaster.fill(data)

      // Insert to the database
      await krosmaster.save()
    }

    return krosmasters
  } catch (error) {
    console.error(error)
  }

  return []
}

const getKrosmaster = async (url) => {
  try {
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)
    const name = $('#KrosName').text().trim()
    const level = $('#KrosLvl').text().trim()
    const figurine = $('#figurine img').attr('src')
    const init = $('#KrosInit').text().trim()
    const mp = $('#MP').text().trim()
    const hp = $('#HP').text().trim()
    const ap = $('#AP').text().trim()

    return {
      name,
      level,
      figurine,
      init,
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
    // Write your database queries inside the run method
    await getKrosmasterList(urlList)
  }
}
