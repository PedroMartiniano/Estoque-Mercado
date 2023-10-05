import { v4 as uuid } from "uuid";
import knex from "../../../database";
import { CreateProdutoProps, modifyProdutoProps, ProdutosProps, uploadImageProdutoProps } from "../../@types/Produtos";
import { ProdutosRepository } from "../interfaces/produtos-interface";
import { AppError } from "../../error/AppError";

export class KnexProdutosRepository implements ProdutosRepository {
    async createProduto(data: CreateProdutoProps): Promise<ProdutosProps | null> {
        try {
            const { id_cat, nome, marca, qtde, preco } = data
            const id = uuid()

            const res: ProdutosProps = await knex.transaction(async (trx) => {
                await trx
                    .insert({
                        id,
                        id_cat,
                        nome,
                        marca,
                        qtde,
                        preco
                    })
                    .into('produtos')

                const produto: ProdutosProps[] = await trx
                    .select()
                    .from('produtos')
                    .where({ id })

                return produto[0]
            })

            return res
        } catch {
            return null
        }
    }

    async uploadImage(data: uploadImageProdutoProps): Promise<ProdutosProps | null> {
        try {
            const { id, imagem } = data

            const res: ProdutosProps = await knex.transaction(async (trx) => {
                await trx
                    .update({ imagem })
                    .from('produtos')
                    .where({ id })

                const produto: ProdutosProps[] = await trx
                    .select()
                    .from('produtos')
                    .where({ id })

                return produto[0]
            })

            return res
        } catch {
            return null
        }
    }

    async entradaProduto(data: modifyProdutoProps): Promise<ProdutosProps | null> {
        try {
            const { id, qtdeProd } = data
            const res: ProdutosProps = await knex.transaction(async (trx) => {
                const prod: ProdutosProps[] = await trx
                    .select()
                    .from('produtos')
                    .where({ id })

                await trx
                    .update({
                        qtde: prod[0].qtde + qtdeProd
                    })
                    .from('produtos')
                    .where({ id })

                const newProd: ProdutosProps[] = await trx
                    .select()
                    .from('produtos')
                    .where({ id })

                return newProd[0]
            })

            return res
        } catch {
            return null
        }
    }

    async getProdutoById(id: string): Promise<ProdutosProps | null> {
        try {
            const produto: ProdutosProps[] = await knex
                .select()
                .from('produtos')
                .where({ id })

            return produto[0]
        } catch {
            return null
        }
    }

    async getProdutoByIdCat(id_cat: string): Promise<ProdutosProps[] | null> {
        try {
            const produtos: ProdutosProps[] = await knex
                .select()
                .from('produtos')
                .where({ id_cat })

            return produtos
        } catch {
            return null
        }
    }

    async baixaProduto(data: modifyProdutoProps): Promise<ProdutosProps | null> {
        try {
            const { id, qtdeProd } = data

            const res: ProdutosProps = await knex.transaction(async (trx) => {
                const prod: ProdutosProps[] = await trx
                    .select()
                    .from('produtos')
                    .where({ id })

                if (prod[0].qtde < qtdeProd) {
                    throw new AppError()
                }

                await trx
                    .update({
                        qtde: prod[0].qtde - qtdeProd
                    })
                    .from('produtos')
                    .where({ id })

                const newProd: ProdutosProps[] = await trx
                    .select()
                    .from('produtos')
                    .where({ id })

                return newProd[0]
            })

            return res
        } catch {
            return null
        }
    }
}