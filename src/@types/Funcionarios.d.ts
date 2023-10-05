export interface FuncionarioProps {
    id: string
    nome: string
    sobrenome: string
    cargo: string
    cpf: string
    status_func: number
}

export interface CreateFuncionarioProps {
    nome: string
    sobrenome: string
    cargo: string
    cpf: string
}