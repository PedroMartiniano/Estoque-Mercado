import { CreateClienteProps, ClientesProps } from "../../@types/Clientes";
import { CreateSessaoProps } from "../../@types/Sessoes";
import { ClientesRepository } from "../interfaces/clientes-interface";

export class InMemoryClientesRepository implements ClientesRepository {
    private dbInMemory: ClientesProps[] = []
    private clienteListInMemory: ClientesProps[] = [
        { id: '123', nome: 'first', sobrenome: 'cliente', cpf: '12345678910', status_cliente: 1 },
        { id: '321', nome: 'second', sobrenome: 'cliente', cpf: '12345678911', status_cliente: 1 }
    ]

    async createCliente(data: CreateClienteProps, sesssao: CreateSessaoProps): Promise<ClientesProps | null> {
        const cliente: ClientesProps = {
            id: `${this.dbInMemory.length}`,
            nome: 'first',
            sobrenome: 'cliente',
            cpf: '12345678910',
            status_cliente: 1
        }

        this.dbInMemory.push(cliente)

        return cliente
    }

    async getClienteById(id: string): Promise<ClientesProps | null> {
        const cliente = this.dbInMemory.find(cliente => cliente.id === id)

        if (!cliente) {
            return null
        }

        return cliente
    }

    async getClienteByCpf(cpf: string): Promise<ClientesProps | null> {
        const cliente = this.dbInMemory.find(cliente => cliente.cpf === cpf)

        if (!cliente) {
            return null
        }

        return cliente
    }

    async updateCliente(data: ClientesProps): Promise<ClientesProps | null> {
        const clienteIndex = this.dbInMemory.findIndex(cliente => cliente.id === data.id)

        if (clienteIndex === -1) {
            return null
        }

        const newCliente: ClientesProps = {
            ...this.dbInMemory[clienteIndex],
            nome: data.nome,
            sobrenome: data.sobrenome,
            cpf: data.cpf,
            status_cliente: data.status_cliente
        }

        this.dbInMemory[clienteIndex] = newCliente

        return this.dbInMemory[clienteIndex]
    }

    async deleteCliente(id: string): Promise<ClientesProps | null> {
        const clienteIndex = this.dbInMemory.findIndex(cliente => cliente.id === id)

        const deletedCliente: ClientesProps = {
            ...this.dbInMemory[clienteIndex],
            status_cliente: 0
        }

        this.dbInMemory[clienteIndex] = deletedCliente

        return this.dbInMemory[clienteIndex]
    }

    async getAllClientes(): Promise<ClientesProps[] | null> {
        const clientes = this.clienteListInMemory

        return clientes
    }
}