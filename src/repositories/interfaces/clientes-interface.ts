import { ClientesProps, CreateClienteProps } from "../../@types/Clientes";

export interface ClientesRepository {
    createCliente(data: CreateClienteProps): Promise<ClientesProps | null>
}