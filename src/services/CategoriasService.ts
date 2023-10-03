import { CategoriasProps } from "../@types/Categorias";
import { AppError } from "../error/AppError";
import { CategoriasRepository } from "../repositories/interfaces/categorias-interface";

export class CategoriasService {
    constructor(private categoriasRepository: CategoriasRepository) { }

    async createCategoriaExecute(nome: string): Promise<CategoriasProps> {
        const categoria = await this.categoriasRepository.createCategoria(nome)

        if (categoria === null) {
            throw new AppError('Error on creating categoria', 500)
        }

        return categoria
    }
}