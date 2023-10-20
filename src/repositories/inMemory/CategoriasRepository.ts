import { CategoriasProps } from "../../@types/Categorias";
import { CategoriasRepository } from "../interfaces/categorias-interface";

export class InMemoryCategoriasRepository implements CategoriasRepository {
    private categoriasDbInMemory: CategoriasProps[] = []
    private categoriasListInMemory: CategoriasProps[] = [{ id: '123', nome: 'limpeza' }, { id: '321', nome: 'frios' }]

    async createCategoria(nome: string): Promise<CategoriasProps | null> {
        const categoria = {
            id: `${this.categoriasDbInMemory.length}`,
            nome
        }

        this.categoriasDbInMemory.push(categoria)

        return categoria
    }

    async getCategoriaById(id: string): Promise<CategoriasProps | null> {
        const categoria = this.categoriasDbInMemory.find(cat => cat.id === id)

        if (!categoria) {
            return null
        }

        return categoria
    }

    async getCategoriaByNome(nome: string): Promise<CategoriasProps | null> {
        const categoria = this.categoriasDbInMemory.find(cat => cat.nome === nome)

        if (!categoria) {
            return null
        }

        return categoria
    }

    async getAllCategorias(): Promise<CategoriasProps[] | null> {
        const categorias = this.categoriasListInMemory

        return categorias
    }
}