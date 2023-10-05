import { ComprasProps, CreateCompraProps } from "../@types/Compras";
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
}