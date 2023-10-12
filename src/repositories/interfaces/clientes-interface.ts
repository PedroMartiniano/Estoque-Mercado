import { ClientesProps, CreateClienteProps } from "../../@types/Clientes";
import { CreateSessaoProps } from "../../@types/Sessoes";

export interface ClientesRepository {
    createCliente(data: CreateClienteProps, sessao: CreateSessaoProps): Promise<ClientesProps | null>
    getClienteById(id: string): Promise<ClientesProps | null>
    getClienteByCpf(cpf: string): Promise<ClientesProps | null>
    updateCliente(data: ClientesProps): Promise<ClientesProps | null>
    deleteCliente(id: string): Promise<ClientesProps | null>
    getAllClientes(): Promise<ClientesProps[] | null>
}