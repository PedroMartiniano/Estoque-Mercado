import { v4 as uuid } from "uuid";
import knex from "../../../database";
import { CategoriasProps } from "../../@types/Categorias";
import { CategoriasRepository } from "../interfaces/categorias-interface";

export class KnexCategoriasRepository implements CategoriasRepository {
    async createCategoria(nome: string): Promise<CategoriasProps | null> {
        try {
            const id = uuid()

            const res: CategoriasProps = await knex.transaction(async (trx) => {
                await trx
                    .insert({
                        id,
                        nome
                    })
                    .into('categorias')

                const categoria: CategoriasProps[] = await trx
                    .select()
                    .from('categorias')
                    .where({ id })

                return categoria[0]
            })

            return res
        } catch {
            return null
        }
    }

    async getCategoriaById(id: string): Promise<CategoriasProps | null> {
        try {
            const categoria: CategoriasProps[] = await knex
                .select()
                .from('categorias')
                .where({ id })

            return categoria[0]
        } catch {
            return null
        }
    }

    async getAllCategorias(): Promise<CategoriasProps[] | null> {
        try {
            const categorias: CategoriasProps[] = await knex
                .select()
                .from('categorias')

            return categorias
        } catch {
            return null
        }
    }

    async getCategoriaByNome(nome: string): Promise<CategoriasProps | null> {
        try {
            const categoria: CategoriasProps[] = await knex
                .select()
                .from('categorias')
                .where({ nome })

            return categoria[0]
        } catch {
            return null
        }
    }
}