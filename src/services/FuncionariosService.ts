import { CreateFuncionarioProps, FuncionarioProps } from "../@types/Funcionarios";
import { CreateSessaoProps } from "../@types/Sessoes";
import { AppError } from "../error/AppError";
import { FuncionariosRepository } from "../repositories/interfaces/funcionarios-interfaces";

export class FuncionariosService {
    constructor(private funcionariosRepository: FuncionariosRepository) { }

    async createFuncionarioExecute(data: CreateFuncionarioProps, sessao: CreateSessaoProps): Promise<FuncionarioProps> {
        const isCpfExist = await this.funcionariosRepository.getFuncionarioByCpf(data.cpf)

        if (isCpfExist) {
            throw new AppError('Cpf already exists', 400)
        }

        const funcionario = await this.funcionariosRepository.createFuncionario(data, sessao)

        if (funcionario === null) {
            throw new AppError('Something went wrong creating funcionário.', 500)
        }

        return funcionario
    }

    async getFuncionarioByIdExecute(id: string): Promise<FuncionarioProps> {
        const funcionario = await this.funcionariosRepository.getFuncionarioById(id)

        if (funcionario === null) {
            throw new AppError('Error on getting funcionario', 500)
        }

        return funcionario
    }

    // async getFuncionarioByCpfExecute(cpf: string): Promise<FuncionarioProps | null> {
    //     const funcionario = await this.funcionariosRepository.getFuncionarioByCpf(cpf)

    //     if (funcionario === null) {
    //         throw new AppError('Error on getting funcionario', 500)
    //     }

    //     return funcionario
    // }

    async updateFuncionarioExecute(data: FuncionarioProps): Promise<FuncionarioProps> {
        const funcionarioId = await this.funcionariosRepository.getFuncionarioById(data.id)

        if (!funcionarioId) {
            throw new AppError('Funcinario not founded', 400)
        }

        const cpfFuncionario = await this.funcionariosRepository.getFuncionarioByCpf(data.cpf)

        if (cpfFuncionario) {
            if (data.id !== cpfFuncionario.id) {
                throw new AppError('Cpf already exists', 400)
            }
        }

        const funcionario = await this.funcionariosRepository.updateFuncionario(data)

        if (funcionario === null) {
            throw new AppError('Error on updating funcionario', 500)
        }

        return funcionario
    }

    async deleteFuncionarioExecute(id: string): Promise<FuncionarioProps> {
        const funcionarioId = await this.funcionariosRepository.getFuncionarioById(id)

        if (!funcionarioId) {
            throw new AppError('Funcionario not found!', 400)
        }

        if (funcionarioId.status_func === 0) {
            throw new AppError('Funcionario already disabled', 400)
        }

        const funcionario = await this.funcionariosRepository.deleteFuncionario(id)

        if (funcionario === null) {
            throw new AppError('Something went wrong deleting funcinario', 500)
        }

        return funcionario
    }

    async getAllFuncionariosExecute(): Promise<FuncionarioProps[]> {
        const funcionarios = await this.funcionariosRepository.getAllFuncionarios()

        if (funcionarios === null) {
            throw new AppError('Error on getting funcionarios', 500)
        }

        return funcionarios
    }
}   