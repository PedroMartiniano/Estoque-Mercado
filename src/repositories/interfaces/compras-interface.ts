import { ComprasProps, CreateCompraProps } from "../../@types/Compras";

export interface ComprasRepository {
    createCompra(data: CreateCompraProps): Promise<ComprasProps | null>
}