import { KnexComprasRepository } from "../repositories/knexjs/ComprasRepository"
import { ComprasService } from "../services/ComprasService"

export const makeComprasService = () => {
    const knexComprasRepository = new KnexComprasRepository
    const comprasService = new ComprasService(knexComprasRepository)

    return comprasService
}