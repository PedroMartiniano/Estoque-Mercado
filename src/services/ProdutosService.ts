import { CreateProdutoProps, modifyProdutoProps, ProdutosProps, uploadImageProdutoProps } from "../@types/Produtos";
import { AppError } from "../error/AppError";
import { ProdutosRepository } from "../repositories/interfaces/produtos-interface";

export class ProdutosService {
    constructor(private produtosRepository: ProdutosRepository) { }

    async createProdutoExecute(data: CreateProdutoProps): Promise<ProdutosProps> {
        const produto = await this.produtosRepository.createProduto(data)

        if (produto === null) {
            throw new AppError('Error on creating produto', 500)
        }

        return produto
    }

    async uploadImageExecute(data: uploadImageProdutoProps): Promise<ProdutosProps> {
        const produto = await this.produtosRepository.uploadImage(data)

        if (produto === null) {
            throw new AppError('Error on uploading image', 500)
        }

        return produto
    }

    async entradaProdutoExecute(data: modifyProdutoProps): Promise<ProdutosProps> {
        const produto = await this.produtosRepository.entradaProduto(data)

        if (produto === null) {
            throw new AppError('Error on request', 500)
        }

        return produto
    }

    async getProdutoByIdExecute(id: string): Promise<ProdutosProps> {
        const produto = await this.produtosRepository.getProdutoById(id)

        if (produto === null) {
            throw new AppError('erro getting produto', 500)
        }

        return produto
    }

    async getProdutoByIdCatExecute(id_cat: string): Promise<ProdutosProps[]> {
        const produto = await this.produtosRepository.getProdutoByIdCat(id_cat)

        if (produto === null) {
            throw new AppError('erro getting produtos', 500)
        }

        return produto
    }

    async baixaProdutoExecute(data: modifyProdutoProps): Promise<ProdutosProps> {
        const produto = await this.produtosRepository.baixaProduto(data)

        if (produto === null) {
            throw new AppError('Error on request', 500)
        }

        return produto
    }
}