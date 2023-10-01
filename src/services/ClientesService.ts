import { ClientesProps, CreateClienteProps } from "../@types/Clientes";
import { AppError } from "../error/AppError";
import { ClientesRepository } from "../repositories/interfaces/clientes-interface";

export class ClientesService {
    constructor(private clientesRepository: ClientesRepository) { }

    async createClientesExecute(data: CreateClienteProps): Promise<ClientesProps | null> {
        const cliente = await this.clientesRepository.createCliente(data)

        if (cliente === null) {
            throw new AppError('Something went wrong creating cliente', 500)
        }

        return cliente
    }
}