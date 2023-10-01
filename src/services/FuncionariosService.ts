import { CreateFuncionarioProps, FuncionarioProps } from "../@types/Funcionarios";
import { AppError } from "../error/AppError";
import { FuncionariosRepository } from "../repositories/interfaces/funcionarios-interfaces";

export class FuncionariosService {
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

        if (funcionario === null) {
            throw new AppError('Error on getting funcionario', 500)
        }

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

        if (funcionario === null) {
            throw new AppError('Error on updating funcionario', 500)
        }

        return funcionario
    }

    async deleteFuncionarioExecute(id: string): Promise<FuncionarioProps | null> {
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
            throw new AppError('Error on geting funcionarios', 500)
        }

        return funcionarios
    }
}   