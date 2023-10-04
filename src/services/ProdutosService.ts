import { CreateProdutoProps, EntradaProdutoProps, ProdutosProps, uploadImageProdutoProps } from "../@types/Produtos";
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

    async entradaProdutoExecute(data: EntradaProdutoProps): Promise<ProdutosProps> {
        const produto = await this.produtosRepository.entradaProduto(data)

        if (produto === null) {
            throw new AppError('Error on request', 500)
        }

        return produto
    }

    async getProdutoByIdExecute(id: string): Promise<ProdutosProps> {
        const produto = await this.produtosRepository.getProdutoById(id)

        if (produto === null) {
            throw new AppError('erro geting produto', 500)
        }

        return produto
    }
}