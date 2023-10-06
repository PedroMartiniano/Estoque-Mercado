import { KnexAvaliacoesRepository } from "../repositories/knexjs/AvaliacoesRepository"
import { AvaliacoesService } from "../services/AvaliacoesService"

export const makeAvaliacoesService = () => {
    const knexAvaliacoesRepository = new KnexAvaliacoesRepository
    const avaliacoesService = new AvaliacoesService(knexAvaliacoesRepository)

    return avaliacoesService
}