import { KnexClientesRepository } from "../repositories/knexjs/ClientesRepository"
import { ClientesService } from "../services/ClientesService"

export const makeClientesService = () => {
    const knexClientesRepository = new KnexClientesRepository
    const clientesService = new ClientesService(knexClientesRepository)

    return clientesService
}