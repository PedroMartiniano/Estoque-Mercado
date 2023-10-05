import { v4 as uuid } from "uuid";
import knex from "../../../database";
import { CreateCompraProps, ComprasProps } from "../../@types/Compras";
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
}