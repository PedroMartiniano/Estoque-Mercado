import { ComprasProps, CreateCompraProps, UserProdCompraProps } from "../@types/Compras";
import { AppError } from "../error/AppError";
import { ComprasRepository } from "../repositories/interfaces/compras-interface";

export class ComprasService {
    constructor(private comprasRepository: ComprasRepository) { }

    async createCompraExecute(data: CreateCompraProps): Promise<ComprasProps> {
        const compra = await this.comprasRepository.createCompra(data)

        if (compra === null) {
            throw new AppError('Error on creating compra')
        }

        return compra
    }

    async getCompraByIdExecute(id: string): Promise<ComprasProps> {
        const compra = await this.comprasRepository.getCompraById(id)

        if (compra === null) {
            throw new AppError('Error on getting compra', 500)
        }

        return compra
    }

    async cancelarCompraExecute(id: string, id_cliente: string): Promise<ComprasProps> {
        const compraId = await this.comprasRepository.getCompraById(id)

        if (!compraId) {
            throw new AppError('Compra not founded!', 400)
        }

        if (compraId.id_cliente !== id_cliente) {
            throw new AppError('Compra is not from you', 400)
        }

        const compra = await this.comprasRepository.cancelarCompra(id)

        if (compra === null) {
            throw new AppError('Error on request', 500)
        }

        return compra
    }

    async getUserProdCompraExecute(data: UserProdCompraProps): Promise<ComprasProps[]> {
        const compras = await this.comprasRepository.getUserProdCompra(data)

        if (compras === null) {
            throw new AppError('Error on getting compras', 500)
        }

        return compras
    }
}