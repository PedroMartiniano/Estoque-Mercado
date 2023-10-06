import { ComprasProps, CreateCompraProps, UserProdCompraProps } from "../../@types/Compras";

export interface ComprasRepository {
    createCompra(data: CreateCompraProps): Promise<ComprasProps | null>
    getCompraById(id: string): Promise<ComprasProps | null>
    cancelarCompra(id: string): Promise<ComprasProps | null>
    getUserProdCompra(data: UserProdCompraProps): Promise<ComprasProps[] | null>
}