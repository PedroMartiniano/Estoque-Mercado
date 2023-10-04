import { CategoriasProps } from "../../@types/Categorias";

export interface CategoriasRepository {
    createCategoria(nome: string): Promise<CategoriasProps | null>
    getCategoriaById(id: string): Promise<CategoriasProps | null>
    getAllCategorias(): Promise<CategoriasProps[] | null>
    getCategoriaByNome(nome: string): Promise<CategoriasProps | null>
}