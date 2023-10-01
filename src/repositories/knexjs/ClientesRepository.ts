import { v4 as uuid } from "uuid";
import knex from "../../../database";
import { CreateClienteProps, ClientesProps } from "../../@types/Clientes";
import { ClientesRepository } from "../interfaces/clientes-interface";

export class KnexClientesRepository implements ClientesRepository {
    async createCliente(data: CreateClienteProps): Promise<ClientesProps | null> {
        const { nome, sobrenome, cpf } = data
        
        try {
            const id = uuid()

            const res = await knex.transaction(async (trx) => {
                await trx
                    .insert({
                        id,
                        nome,
                        sobrenome,
                        cpf
                    })
                    .into('clientes')

                const cliente: ClientesProps[] = await trx
                    .select()
                    .from('clientes')
                    .where({ id })

                return cliente[0]
            })

            return res
        } catch {
            return null
        }
    }
}