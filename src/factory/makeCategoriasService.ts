import { KnexCategoriasRepository } from "../repositories/knexjs/CategoriasRepository"
import { CategoriasService } from "../services/CategoriasService"

export const makeCategoriasService = () => {
    const knexCategoriasRepository = new KnexCategoriasRepository
    const categoriasService = new CategoriasService(knexCategoriasRepository)

    return categoriasService
}