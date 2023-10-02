export interface SessaoProps {
    id: string
    id_func: string | null
    id_cliente: string | null
    email: string
    senha: string
    status_sessao: number
}

export interface CreateSessaoProps {
    email: string
    senha: string
}