import { CreateFuncionarioProps, FuncionarioProps } from "../../@types/Funcionarios";
import { CreateSessaoProps } from "../../@types/Sessoes";
import { FuncionariosRepository } from "../interfaces/funcionarios-interfaces";

export class InMemoryFuncionariosRepository implements FuncionariosRepository {
    private dbInMemory: FuncionarioProps[] = []
    private funcInMemory: FuncionarioProps[] = [
        { id: '123', nome: 'first', sobrenome: 'func', cargo: 'GERENTE', cpf: '12345678910', status_func: 1 },
        { id: '321', nome: 'second', sobrenome: 'func', cargo: 'FUNCIONARIO', cpf: '12345678911', status_func: 1 }
    ]

    async createFuncionario(data: CreateFuncionarioProps, sessao: CreateSessaoProps): Promise<FuncionarioProps | null> {
        const funcionario = {
            id: `${this.dbInMemory.length}`,
            nome: data.nome,
            sobrenome: data.sobrenome,
            cargo: data.cargo,
            cpf: data.cpf,
            status_func: 1
        }

        this.dbInMemory.push(funcionario)

        return funcionario
    }

    async getFuncionarioById(id: string): Promise<FuncionarioProps | null> {
        const funcionario = this.dbInMemory.find(func => func.id === id)

        if (!funcionario) {
            return null
        }

        return funcionario
    }

    async getFuncionarioByCpf(cpf: string): Promise<FuncionarioProps | null> {
        const funcionario = this.dbInMemory.find(func => func.cpf === cpf)

        if (!funcionario) {
            return null
        }

        return funcionario
    }

    async updateFuncionario(data: FuncionarioProps): Promise<FuncionarioProps | null> {
        const funcIndex = this.dbInMemory.findIndex(func => func.id === data.id)

        if (funcIndex === -1) {
            return null
        }

        const newFunc = {
            id: data.id,
            nome: data.nome,
            sobrenome: data.sobrenome,
            cargo: data.cargo,
            cpf: data.cpf,
            status_func: data.status_func
        }

        this.dbInMemory[funcIndex] = newFunc

        return this.dbInMemory[funcIndex]
    }

    async deleteFuncionario(id: string): Promise<FuncionarioProps | null> {
        const funcIndex = this.dbInMemory.findIndex(func => func.id === id)

        if (funcIndex === -1) {
            return null
        }

        const funcionario = this.dbInMemory[funcIndex]

        const newFunc = {
            ...funcionario,
            status_func: 0
        }

        this.dbInMemory[funcIndex] = newFunc

        return this.dbInMemory[funcIndex]
    }

    async getAllFuncionarios(): Promise<FuncionarioProps[] | null> {
        const funcionarios = this.funcInMemory

        return funcionarios
    }
}