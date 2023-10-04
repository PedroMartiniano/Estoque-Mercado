import { CategoriasProps } from "../@types/Categorias";
import { AppError } from "../error/AppError";
import { CategoriasRepository } from "../repositories/interfaces/categorias-interface";

export class CategoriasService {
    constructor(private categoriasRepository: CategoriasRepository) { }

    async createCategoriaExecute(nome: string): Promise<CategoriasProps> {
        const isNameExist = await this.categoriasRepository.getCategoriaByNome(nome)

        if (isNameExist) {
            throw new AppError('Categoria already exists', 400)
        }

        const categoria = await this.categoriasRepository.createCategoria(nome)

        if (categoria === null) {
            throw new AppError('Error on creating categoria', 500)
        }

        return categoria
    }

    async getCategoriaByIdExecute(id: string): Promise<CategoriasProps> {
        const categoria = await this.categoriasRepository.getCategoriaById(id)

        if (categoria === null) {
            throw new AppError('Error on geting categoria', 500)
        }

        return categoria
    }

    async getAllCategoriasExecute(): Promise<CategoriasProps[]> {
        const categorias = await this.categoriasRepository.getAllCategorias()

        if (categorias === null) {
            throw new AppError('Error on geting categorias', 500)
        }

        return categorias
    }
}