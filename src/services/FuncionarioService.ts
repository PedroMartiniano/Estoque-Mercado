import { CreateFuncionarioProps, FuncionarioProps } from "../@types/Funcionario";
import { AppError } from "../error/AppError";
import { FuncionariosRepository } from "../repositories/interfaces/funcionarios-interfaces";

export class FuncionarioService {
    constructor(private funcionariosRepository: FuncionariosRepository) { }

    async createFuncionarioExecute(data: CreateFuncionarioProps): Promise<FuncionarioProps | null> {
        const isCpfExist = await this.funcionariosRepository.getFuncionarioByCpf(data.cpf)

        if (isCpfExist) {
            throw new AppError('Cpf already exists', 400)
        }

        const funcionario = await this.funcionariosRepository.createFuncionario(data)

        if (funcionario === null) {
            throw new AppError('Something went wrong creating funcionário.', 500)
        }

        return funcionario
    }

    async getFuncionarioByIdExecute(id: string): Promise<FuncionarioProps | null> {
        const funcionario = await this.funcionariosRepository.getFuncionarioById(id)

        if (funcionario === null) {
            throw new AppError('Error on geting funcionario', 500)
        }

        return funcionario
    }

    async getFuncionarioByCpfExecute(cpf: string): Promise<FuncionarioProps | null> {
        const funcionario = await this.funcionariosRepository.getFuncionarioByCpf(cpf)

        return funcionario
    }

    async updateFuncionarioExecute(data: FuncionarioProps): Promise<FuncionarioProps | null> {
        const cpfFuncionario = await this.funcionariosRepository.getFuncionarioByCpf(data.cpf)

        if (cpfFuncionario) {
            if (data.id !== cpfFuncionario.id) {
                throw new AppError('Cpf already exists', 400)
            }
        }

        const funcionario = await this.funcionariosRepository.updateFuncionario(data)

        return funcionario
    }
}