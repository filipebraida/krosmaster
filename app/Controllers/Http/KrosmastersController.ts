import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Krosmaster from 'App/Models/Krosmaster'

export default class KrosmastersController {
  public async index({ view }: HttpContextContract) {
    const krosmasters = await Krosmaster.query()
      .preload('cards')
      .preload('collection', (builder) => {
        builder.preload('season')
      })
    return view.render('krosmaster/index', { krosmasters: krosmasters })
  }

  public async show({ view, params }: HttpContextContract) {
    const krosmaster = await Krosmaster.findOrFail(params.id)
    await krosmaster.load('cards')

    return view.render('krosmaster/show', { krosmaster: krosmaster })
  }

  public async edit({ view }: HttpContextContract) {
    return view.render('krosmaster/edit')
  }

  public async seasons({ view, params }: HttpContextContract) {
    const krosmasters = await Krosmaster.query()
      .select('krosmasters.*')
      .preload('cards')
      .preload('collection', (builder) => {
        builder.preload('season')
      })
      .join('collections', 'collection_id', 'collections.id')
      .join('seasons', 'season_id', 'seasons.id')
      .where('seasons.id', params.id)

    return view.render('krosmaster/index', { krosmasters: krosmasters })
  }

  public async collections({ view, params }: HttpContextContract) {
    const krosmasters = await Krosmaster.query()
      .select('krosmasters.*')
      .where('collection_id', params.id)
      .preload('cards')
      .preload('collection', (builder) => {
        builder.preload('season')
      })

    return view.render('krosmaster/index', { krosmasters: krosmasters })
  }
}
