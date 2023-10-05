export interface ComprasProps {
    id: string
    id_cliente: string
    id_produto: string
    qtde: number
    preco_total: number
}

export interface CreateCompraProps {
    id_cliente: string
    id_produto: string
    qtde: number
    preco_total: number
}