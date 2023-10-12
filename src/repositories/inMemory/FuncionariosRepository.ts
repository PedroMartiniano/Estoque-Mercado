import { CreateFuncionarioProps, FuncionarioProps } from "../../@types/Funcionarios";
import { CreateSessaoProps, SessaoProps } from "../../@types/Sessoes";
import { FuncionariosRepository } from "../interfaces/funcionarios-interfaces";

export class InMemoryFuncionariosRepository implements FuncionariosRepository {
    private funcDbInMemory: FuncionarioProps[] = []
    private funcListInMemory: FuncionarioProps[] = [
        { id: '123', nome: 'first', sobrenome: 'func', cargo: 'GERENTE', cpf: '12345678910', status_func: 1 },
        { id: '321', nome: 'second', sobrenome: 'func', cargo: 'FUNCIONARIO', cpf: '12345678911', status_func: 1 }
    ]
    private sessaoDbInMemory: SessaoProps[] = []

    async createFuncionario(data: CreateFuncionarioProps, sessao: CreateSessaoProps): Promise<FuncionarioProps | null> {
        const funcionario: FuncionarioProps = {
            id: `${this.funcDbInMemory.length}`,
            nome: data.nome,
            sobrenome: data.sobrenome,
            cargo: data.cargo,
            cpf: data.cpf,
            status_func: 1
        }

        this.funcDbInMemory.push(funcionario)

        const sessaoData: SessaoProps = {
            id: `${this.sessaoDbInMemory.length}`,
            id_cliente: null,
            id_func: funcionario.id,
            email: sessao.email,
            senha: sessao.senha,
            status_sessao: 1
        }

        this.sessaoDbInMemory.push(sessaoData)

        return funcionario
    }

    async getFuncionarioById(id: string): Promise<FuncionarioProps | null> {
        const funcionario = this.funcDbInMemory.find(func => func.id === id)

        if (!funcionario) {
            return null
        }

        return funcionario
    }

    async getFuncionarioByCpf(cpf: string): Promise<FuncionarioProps | null> {
        const funcionario = this.funcDbInMemory.find(func => func.cpf === cpf)

        if (!funcionario) {
            return null
        }

        return funcionario
    }

    async updateFuncionario(data: FuncionarioProps): Promise<FuncionarioProps | null> {
        const funcIndex = this.funcDbInMemory.findIndex(func => func.id === data.id)

        const newFunc: FuncionarioProps = {
            ...this.funcDbInMemory[funcIndex],
            nome: data.nome,
            sobrenome: data.sobrenome,
            cargo: data.cargo,
            cpf: data.cpf,
            status_func: data.status_func
        }

        this.funcDbInMemory[funcIndex] = newFunc

        return this.funcDbInMemory[funcIndex]
    }

    async deleteFuncionario(id: string): Promise<FuncionarioProps | null> {
        const funcIndex = this.funcDbInMemory.findIndex(func => func.id === id)

        const funcionario = this.funcDbInMemory[funcIndex]

        const newFunc: FuncionarioProps = {
            ...funcionario,
            status_func: 0
        }

        this.funcDbInMemory[funcIndex] = newFunc

        return this.funcDbInMemory[funcIndex]
    }

    async getAllFuncionarios(): Promise<FuncionarioProps[] | null> {
        const funcionarios = this.funcListInMemory

        return funcionarios
    }
}