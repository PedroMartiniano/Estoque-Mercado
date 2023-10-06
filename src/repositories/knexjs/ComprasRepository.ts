import { v4 as uuid } from "uuid";
import knex from "../../../database";
import { CreateCompraProps, ComprasProps, UserProdCompraProps } from "../../@types/Compras";
import { ComprasRepository } from "../interfaces/compras-interface";
import { ProdutosProps } from "../../@types/Produtos";

export class KnexComprasRepository implements ComprasRepository {
    async createCompra(data: CreateCompraProps): Promise<ComprasProps | null> {
        try {
            const { id_cliente, id_produto, qtde, preco_total } = data
            const id = uuid()

            const res: ComprasProps = await knex.transaction(async (trx) => {
                await trx
                    .insert({
                        id,
                        id_cliente,
                        id_produto,
                        qtde,
                        preco_total
                    })
                    .into('compras')

                const prod: ProdutosProps[] = await trx
                    .select()
                    .from('produtos')
                    .where({ id: id_produto })

                await trx
                    .update({
                        qtde: prod[0].qtde - qtde
                    })
                    .from('produtos')
                    .where({ id: id_produto })

                const compra: ComprasProps[] = await trx
                    .select()
                    .from('compras')
                    .where({ id })

                return compra[0]
            })

            return res
        } catch {
            return null
        }
    }

    async getCompraById(id: string): Promise<ComprasProps | null> {
        try {
            const compra: ComprasProps[] = await knex
                .select()
                .from('compras')
                .where({ id })

            return compra[0]
        } catch {
            return null
        }
    }

    async cancelarCompra(id: string): Promise<ComprasProps | null> {
        try {
            const res = await knex.transaction(async (trx) => {
                await trx
                    .update({ status_compra: 0 })
                    .from('compras')
                    .where({ id })

                const compra: ComprasProps[] = await trx
                    .select()
                    .from('compras')
                    .where({ id })

                const produto: ProdutosProps[] = await trx
                    .select()
                    .from('produtos')
                    .where({ id: compra[0].id_produto })

                await trx
                    .update({ qtde: produto[0].qtde + compra[0].qtde })
                    .from('produtos')
                    .where({ id: compra[0].id_produto })

                return compra[0]
            })

            return res
        } catch {
            return null
        }
    }

    async getUserProdCompra(data: UserProdCompraProps): Promise<ComprasProps[] | null> {
        try {
            const { id_cliente, id_produto } = data

            const compras: ComprasProps[] = await knex
                .select()
                .from('compras')
                .where({ id_cliente })
                .andWhere({ id_produto })

            return compras
        } catch {
            return null
        }
    }
}