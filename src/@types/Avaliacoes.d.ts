export interface AvaliacoesProps {
    id: string
    id_cliente: string
    id_produto: string
    nota: number
    menssagem: string
    verifica_msg: string
}

export interface CreateAvaliacaoProps {
    id_cliente: string
    id_produto: string
    nota: number
    menssagem: string
    verifica_msg: string | null
}

export interface GetAvaliacaoProps {
    id_cliente: string
    id_produto: string
}

export interface updateAvaliacaoProps {
    nota: number
    menssagem: string
    verifica_msg: string | null
}