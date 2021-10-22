import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Krosmaster from 'App/Models/Krosmaster'

export default class KrosmastersController {
  public async index({ view }: HttpContextContract) {
    const krosmasters = await Krosmaster.all()
    return view.render('welcome', { krosmasters: krosmasters })
  }
}
