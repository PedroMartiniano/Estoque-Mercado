import { ClientesProps, CreateClienteProps } from "../@types/Clientes";
import { AppError } from "../error/AppError";
import { ClientesRepository } from "../repositories/interfaces/clientes-interface";

export class ClientesService {
    constructor(private clientesRepository: ClientesRepository) { }

    async createClientesExecute(data: CreateClienteProps): Promise<ClientesProps | null> {
        const clienteCpf = await this.clientesRepository.getClienteByCpf(data.cpf)

        if (clienteCpf) {
            throw new AppError('Cpf already exists', 400)
        }

        const cliente = await this.clientesRepository.createCliente(data)

        if (cliente === null) {
            throw new AppError('Something went wrong creating cliente', 500)
        }

        return cliente
    }

    async getClienteByIdExecute(id: string): Promise<ClientesProps | null> {
        const cliente = await this.clientesRepository.getClienteById(id)

        if (cliente === null) {
            throw new AppError('Something went wrong geting cliente', 500)
        }

        return cliente
    }

    async getClienteByCpfExecute(cpf: string): Promise<ClientesProps | null> {
        const cliente = await this.clientesRepository.getClienteByCpf(cpf)

        if (cliente === null) {
            throw new AppError('Error on geting cliente', 500)
        }

        return cliente
    }

    async updateClienteExecute(data: ClientesProps): Promise<ClientesProps | null> {
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
}