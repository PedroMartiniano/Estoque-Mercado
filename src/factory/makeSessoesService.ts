import { KnexSessoesRepository } from "../repositories/knexjs/SessoesRepository"
import { SessoesService } from "../services/SessoesService"

export const makeSessoesService = () => {
    const knexSessoesRepository = new KnexSessoesRepository
    const sessoesService = new SessoesService(knexSessoesRepository)

    return sessoesService
}