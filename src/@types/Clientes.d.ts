export interface ClientesProps {
    id: string
    nome: string
    sobrenome: string
    cpf: string
    status_cliente: number
}

export interface CreateClienteProps {
    nome: string
    sobrenome: string
    cpf: string
}