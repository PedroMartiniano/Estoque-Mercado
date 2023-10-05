export interface ProdutosProps {
    id: string
    id_cat: string
    nome: string
    marca: string
    imagem: string
    qtde: number
    preco: number
    status_prod: number
}

export interface CreateProdutoProps {
    id_cat: string
    nome: string
    marca: string
    qtde: number
    preco: number
}

export interface modifyProdutoProps {
    id: string
    qtdeProd: number
}

export interface uploadImageProdutoProps {
    id: string
    imagem: string
}