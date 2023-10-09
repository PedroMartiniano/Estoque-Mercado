import { ClientesProps, CreateClienteProps } from "../@types/Clientes";
import { CreateSessaoProps } from "../@types/Sessoes";
import { AppError } from "../error/AppError";
import { ClientesRepository } from "../repositories/interfaces/clientes-interface";

export class ClientesService {
    constructor(private clientesRepository: ClientesRepository) { }

    async createClientesExecute(data: CreateClienteProps, sessao: CreateSessaoProps): Promise<ClientesProps> {
        const clienteCpf = await this.clientesRepository.getClienteByCpf(data.cpf)

        if (clienteCpf) {
            throw new AppError('Cpf already exists', 400)
        }

        const cliente = await this.clientesRepository.createCliente(data, sessao)

        if (cliente === null) {
            throw new AppError('Something went wrong creating cliente', 500)
        }

        return cliente
    }

    async getClienteByIdExecute(id: string): Promise<ClientesProps> {
        const cliente = await this.clientesRepository.getClienteById(id)

        if (cliente === null) {
            throw new AppError('Something went wrong getting cliente', 500)
        }

        return cliente
    }

    // async getClienteByCpfExecute(cpf: string): Promise<ClientesProps> {
    //     const cliente = await this.clientesRepository.getClienteByCpf(cpf)

    //     if (cliente === null) {
    //         throw new AppError('Error on getting cliente', 500)
    //     }

    //     return cliente
    // }

    async updateClienteExecute(data: ClientesProps): Promise<ClientesProps> {
        const clienteId = await this.clientesRepository.getClienteById(data.id)

        if (!clienteId) {
            throw new AppError('Cliente not founded', 400)
        }

        const clienteCpf = await this.clientesRepository.getClienteByCpf(data.cpf)

        if (clienteCpf) {
            if (data.id !== clienteCpf.id) {
                throw new AppError('Cpf already exists', 400)
            }
        }

        const cliente = await this.clientesRepository.updateCliente(data)

        if (cliente === null) {
            throw new AppError('Something went wrong updating cliente', 500)
        }

        return cliente
    }

    async deleteClienteExecute(id: string): Promise<ClientesProps> {
        const clienteId = await this.clientesRepository.getClienteById(id)

        if (!clienteId) {
            throw new AppError('Cliente not found!', 400)
        }

        if (clienteId.status_cliente === 0) {
            throw new AppError('Cliente already disabled', 400)
        }

        const cliente = await this.clientesRepository.deleteCliente(id)

        if (cliente === null) {
            throw new AppError('Something went wrong deleting cliente', 500)
        }

        return cliente
    }

    async getAllClientesExecute(): Promise<ClientesProps[]> {
        const clientes = await this.clientesRepository.getAllClientes()

        if (clientes === null) {
            throw new AppError('Error on getting clientes', 500)
        }

        return clientes
    }
}