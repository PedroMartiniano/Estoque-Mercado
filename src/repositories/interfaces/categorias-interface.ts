import { CategoriasProps } from "../../@types/Categorias";

export interface CategoriasRepository {
    createCategoria(nome: string): Promise<CategoriasProps | null>
}