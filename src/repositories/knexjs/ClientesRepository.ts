import { v4 as uuid } from "uuid";
import knex from "../../../database";
import { CreateClienteProps, ClientesProps } from "../../@types/Clientes";
import { ClientesRepository } from "../interfaces/clientes-interface";
import { CreateSessaoProps } from "../../@types/Sessoes";
import { hash } from "bcrypt";

export class KnexClientesRepository implements ClientesRepository {
    async createCliente(data: CreateClienteProps, sessao: CreateSessaoProps): Promise<ClientesProps | null> {
        const { nome, sobrenome, cpf } = data
        const { email, senha } = sessao

        try {
            const id_cliente = uuid()
            const id_sessao = uuid()
            const hashPassword = await hash(senha, 4)

            const res: ClientesProps = await knex.transaction(async (trx) => {
                const [, , cliente] = await Promise.all([
                    trx
                        .insert({
                            id: id_cliente,
                            nome,
                            sobrenome,
                            cpf
                        })
                        .into('clientes'),

                    trx
                        .insert({
                            id: id_sessao,
                            id_cliente,
                            email,
                            senha: hashPassword
                        })
                        .into('sessoes'),
                        
                    trx
                        .select()
                        .from('clientes')
                        .where({ id: id_cliente })
                ])

                return cliente[0] as ClientesProps
            })

            return res
        } catch {
            return null
        }
    }

    async getClienteById(id: string): Promise<ClientesProps | null> {
        try {
            const cliente: ClientesProps[] = await knex
                .select()
                .from('clientes')
                .where({ id })

            return cliente[0]
        } catch {
            return null
        }
    }

    async getClienteByCpf(cpf: string): Promise<ClientesProps | null> {
        try {
            const cliente: ClientesProps[] = await knex
                .select()
                .from('clientes')
                .where({ cpf })

            return cliente[0]
        } catch {
            return null
        }
    }

    async updateCliente(data: ClientesProps): Promise<ClientesProps | null> {
        try {
            const { id, nome, sobrenome, cpf, status_cliente } = data

            const res: ClientesProps = await knex.transaction(async (trx) => {
                await trx
                    .update({
                        nome,
                        sobrenome,
                        cpf,
                        status_cliente
                    })
                    .from('clientes')
                    .where({ id })

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

    async deleteCliente(id: string): Promise<ClientesProps | null> {
        try {
            const res: ClientesProps = await knex.transaction(async (trx) => {
                await trx
                    .update({ status_cliente: 0 })
                    .from('clientes')
                    .where({ id })

                await trx
                    .update({ status_sessao: 0 })
                    .from('sessoes')
                    .where({ id_cliente: id })

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

    async getAllClientes(): Promise<ClientesProps[] | null> {
        try {
            const clientes: ClientesProps[] = await knex
                .select()
                .from('clientes')

            return clientes
        } catch {
            return null
        }
    }
}