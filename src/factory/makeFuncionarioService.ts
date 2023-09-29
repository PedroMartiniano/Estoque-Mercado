import { KnexFuncionarioRepository } from "../repositories/knexjs/FuncionarioRepository"
import { FuncionarioService } from "../services/FuncionarioService"

export const makeFuncionarioService = () => {
    const knexFuncionarioRepository = new KnexFuncionarioRepository
    const funcionarioService = new FuncionarioService(knexFuncionarioRepository)

    return funcionarioService
}