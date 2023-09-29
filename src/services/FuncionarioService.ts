import { CreateFuncionarioProps, FuncionarioProps } from "../@types/Funcionario";
import { AppError } from "../error/AppError";
import { FuncionariosRepository } from "../repositories/interfaces/funcionarios-interfaces";

export class FuncionarioService {
    constructor(private funcionariosRepository: FuncionariosRepository) { }

    async createFuncionarioExecute(data: CreateFuncionarioProps): Promise<FuncionarioProps | null> {
        const funcionario = await this.funcionariosRepository.createFuncionario(data)

        if (funcionario === null) {
            throw new AppError('Something went wrong creating funcionário.', 400)
        }

        return funcionario
    }
}