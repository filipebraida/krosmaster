import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Krosmaster from 'App/Models/Krosmaster'

export default class KrosmastersController {
  public async index({ view }: HttpContextContract) {
    const krosmasters = await Krosmaster.all()
    return view.render('krosmaster.index', { krosmasters: krosmasters })
  }

  public async show({ view }: HttpContextContract) {
    const krosmaster = await Krosmaster.findOrFail(1)
    await krosmaster.load('cards')

    return view.render('krosmaster.show', { krosmaster: krosmaster })
  }
}
