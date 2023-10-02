import knex from "../../../database";
import { SessaoProps } from "../../@types/Sessoes";
import { SessoesRepository } from "../interfaces/sessoes-interface";

export class KnexSessoesRepository implements SessoesRepository {
    async getSessaoByEmail(email: string): Promise<SessaoProps | null> {
        try {
            const sessao: SessaoProps[] = await knex
                .select()
                .from('sessoes')
                .where({ email })

            return sessao[0]
        } catch {
            return null
        }
    }
}