import { v4 as uuid } from "uuid";
import knex from "../../../database";
import { CreateAvaliacaoProps, AvaliacoesProps } from "../../@types/Avaliacoes";
import { AvaliacoesRepository } from "../interfaces/avaliacoes-interface";

export class KnexAvaliacoesRepository implements AvaliacoesRepository {
    async createAvaliacao(data: CreateAvaliacaoProps): Promise<AvaliacoesProps | null> {
        try {
            const id = uuid()
            const { id_cliente, id_produto, nota, menssagem, verifica_msg } = data

            const res: AvaliacoesProps = await knex.transaction(async (trx) => {
                await trx
                    .insert({
                        id,
                        id_cliente,
                        id_produto,
                        nota,
                        menssagem,
                        verifica_msg
                    })
                    .into('avaliacoes')

                const avaliacao: AvaliacoesProps[] = await trx
                    .select()
                    .from('avaliacoes')
                    .where({ id })

                return avaliacao[0]
            })

            return res
        } catch {
            return null
        }
    }
}