import { CreateClienteProps, ClientesProps } from "../../@types/Clientes";
import { CreateSessaoProps, SessaoProps } from "../../@types/Sessoes";
import { ClientesRepository } from "../interfaces/clientes-interface";

export class InMemoryClientesRepository implements ClientesRepository {
    private clientDbInMemory: ClientesProps[] = []
    private clienteListInMemory: ClientesProps[] = [
        { id: '123', nome: 'first', sobrenome: 'cliente', cpf: '12345678910', status_cliente: 1 },
        { id: '321', nome: 'second', sobrenome: 'cliente', cpf: '12345678911', status_cliente: 1 }
    ]
    private sessaoDbInMemory: SessaoProps[] = []

    async createCliente(data: CreateClienteProps, sessao: CreateSessaoProps): Promise<ClientesProps | null> {
        const cliente: ClientesProps = {
            id: `${this.clientDbInMemory.length}`,
            nome: data.nome,
            sobrenome: data.sobrenome,
            cpf: data.cpf,
            status_cliente: 1
        }

        this.clientDbInMemory.push(cliente)

        const sessaoData: SessaoProps = {
            id: `${this.sessaoDbInMemory.length}`,
            id_cliente: null,
            id_func: cliente.id,
            email: sessao.email,
            senha: sessao.senha,
            status_sessao: 1
        }

        this.sessaoDbInMemory.push(sessaoData)

        return cliente
    }

    async getClienteById(id: string): Promise<ClientesProps | null> {
        const cliente = this.clientDbInMemory.find(cliente => cliente.id === id)

        if (!cliente) {
            return null
        }

        return cliente
    }

    async getClienteByCpf(cpf: string): Promise<ClientesProps | null> {
        const cliente = this.clientDbInMemory.find(cliente => cliente.cpf === cpf)

        if (!cliente) {
            return null
        }

        return cliente
    }

    async updateCliente(data: ClientesProps): Promise<ClientesProps | null> {
        const clienteIndex = this.clientDbInMemory.findIndex(cliente => cliente.id === data.id)

        const newCliente: ClientesProps = {
            ...this.clientDbInMemory[clienteIndex],
            nome: data.nome,
            sobrenome: data.sobrenome,
            cpf: data.cpf,
            status_cliente: data.status_cliente
        }

        this.clientDbInMemory[clienteIndex] = newCliente

        return this.clientDbInMemory[clienteIndex]
    }

    async deleteCliente(id: string): Promise<ClientesProps | null> {
        const clienteIndex = this.clientDbInMemory.findIndex(cliente => cliente.id === id)

        const deletedCliente: ClientesProps = {
            ...this.clientDbInMemory[clienteIndex],
            status_cliente: 0
        }

        this.clientDbInMemory[clienteIndex] = deletedCliente

        return this.clientDbInMemory[clienteIndex]
    }

    async getAllClientes(): Promise<ClientesProps[] | null> {
        const clientes = this.clienteListInMemory

        return clientes
    }
}