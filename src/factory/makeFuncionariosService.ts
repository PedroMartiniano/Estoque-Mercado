import { KnexFuncionariosRepository } from "../repositories/knexjs/FuncionariosRepository"
import { FuncionariosService } from "../services/FuncionariosService"

export const makeFuncionariosService = () => {
    const knexFuncionarioRepository = new KnexFuncionariosRepository
    const funcionarioService = new FuncionariosService(knexFuncionarioRepository)

    return funcionarioService
}