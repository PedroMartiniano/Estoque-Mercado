import { CreateProdutoProps, EntradaProdutoProps, ProdutosProps, uploadImageProdutoProps } from "../../@types/Produtos";

export interface ProdutosRepository {
    createProduto(data: CreateProdutoProps): Promise<ProdutosProps | null>
    uploadImage(data: uploadImageProdutoProps): Promise<ProdutosProps | null>
    entradaProduto(data: EntradaProdutoProps): Promise<ProdutosProps | null>
}