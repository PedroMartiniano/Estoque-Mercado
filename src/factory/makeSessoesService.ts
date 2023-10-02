import { KnexSessoesRepository } from "../repositories/knexjs/sessoesRepository"
import { SessoesService } from "../services/sessoesService"

export const makeSessoesService = () => {
    const knexSessoesRepository = new KnexSessoesRepository
    const sessoesService = new SessoesService(knexSessoesRepository)

    return sessoesService
}