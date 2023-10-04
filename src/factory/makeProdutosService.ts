import { KnexProdutosRepository } from "../repositories/knexjs/ProdutosRepository"
import { ProdutosService } from "../services/ProdutosService"

export const makeProdutosService = () => {
    const knexProdutosRepository = new KnexProdutosRepository
    const produtosService = new ProdutosService(knexProdutosRepository)

    return produtosService
}