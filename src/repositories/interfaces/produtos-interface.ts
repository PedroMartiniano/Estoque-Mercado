import { CreateProdutoProps, modifyProdutoProps, ProdutosProps, uploadImageProdutoProps } from "../../@types/Produtos";

export interface ProdutosRepository {
    createProduto(data: CreateProdutoProps): Promise<ProdutosProps | null>
    uploadImage(data: uploadImageProdutoProps): Promise<ProdutosProps | null>
    entradaProduto(data: modifyProdutoProps): Promise<ProdutosProps | null>
    getProdutoById(id: string): Promise<ProdutosProps | null>
    getProdutoByIdCat(id_cat: string): Promise<ProdutosProps[] | null>
    getAllProdutos(): Promise<ProdutosProps[] | null>
    baixaProduto(data: modifyProdutoProps): Promise<ProdutosProps | null>
}