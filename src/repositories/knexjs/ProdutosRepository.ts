import { v4 as uuid } from "uuid";
import knex from "../../../database";
import { CreateProdutoProps, EntradaProdutoProps, ProdutosProps, uploadImageProdutoProps } from "../../@types/Produtos";
import { ProdutosRepository } from "../interfaces/produtos-interface";

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

    async entradaProduto(data: EntradaProdutoProps): Promise<ProdutosProps | null> {
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
}