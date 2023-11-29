import { v4 as uuid } from "uuid";
import knex from "../../../database";
import { CreateAvaliacaoProps, AvaliacoesProps, GetAvaliacaoProps, updateAvaliacaoProps } from "../../@types/Avaliacoes";
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

    async getAvaliacaoByUserProd(data: GetAvaliacaoProps): Promise<AvaliacoesProps | null> {
        try {
            const { id_cliente, id_produto } = data

            const avaliacao: AvaliacoesProps[] = await knex
                .select()
                .from('avaliacoes')
                .where({ id_cliente })
                .andWhere({ id_produto })

            return avaliacao[0]
        } catch {
            return null
        }
    }

    async getAvaliacaoByProd(id_produto: string): Promise<AvaliacoesProps[] | null> {
        try {
            const avaliacoes: AvaliacoesProps[] = await knex
                .select()
                .from('avaliacoes')
                .where({ id_produto })

            return avaliacoes
        } catch {
            return null
        }
    }

    async editAvaliacao(data: updateAvaliacaoProps, id: string): Promise<AvaliacoesProps | null> {
        try {
            const { nota, menssagem, verifica_msg } = data
            const avaliacao: AvaliacoesProps = await knex.transaction(async (trx) => {
                await trx
                    .update({
                        nota,
                        menssagem,
                        verifica_msg
                    })
                    .from('avaliacoes')
                    .where({ id })

                const updatedAvaliacao: AvaliacoesProps[] = await trx
                    .select()
                    .from('avaliacoes')
                    .where({ id })

                return updatedAvaliacao[0]
            })

            return avaliacao
        } catch {
            return null
        }
    }
}