import { CreateFuncionarioProps, FuncionarioProps } from "../../@types/Funcionarios";
import { FuncionariosRepository } from "../interfaces/funcionarios-interfaces";
import knex from '../../../database'
import { v4 as uuid } from 'uuid'
import { CreateSessaoProps } from "../../@types/Sessoes";
import { hash } from "bcrypt";

export class KnexFuncionariosRepository implements FuncionariosRepository {
    async createFuncionario(data: CreateFuncionarioProps, sessao: CreateSessaoProps): Promise<FuncionarioProps | null> {
        const { nome, sobrenome, cargo, cpf } = data
        const { email, senha } = sessao

        try {
            const id_func = uuid()
            const id_sessao = uuid()
            const hashPassword = await hash(senha, 4)

            const res: FuncionarioProps = await knex.transaction(async (trx) => {
                await trx
                    .insert({
                        id: id_func,
                        nome,
                        sobrenome,
                        cargo,
                        cpf
                    })
                    .into('funcionarios')

                await trx
                    .insert({
                        id: id_sessao,
                        id_func,
                        email,
                        senha: hashPassword
                    })
                    .into('sessoes')

                const funcionario: FuncionarioProps[] = await trx
                    .select()
                    .from('funcionarios')
                    .where({ id: id_func })

                return funcionario[0]
            })

            return res
        } catch {
            return null
        }
    }

    async getFuncionarioById(id: string): Promise<FuncionarioProps | null> {
        try {
            const funcionario: FuncionarioProps[] = await knex
                .select()
                .from('funcionarios')
                .where({ id })

            return funcionario[0]
        } catch {
            return null
        }
    }

    async getFuncionarioByCpf(cpf: string): Promise<FuncionarioProps | null> {
        try {
            const funcionario: FuncionarioProps[] = await knex
                .select()
                .from('funcionarios')
                .where({ cpf })

            return funcionario[0]
        } catch {
            return null
        }
    }

    async updateFuncionario(data: FuncionarioProps): Promise<FuncionarioProps | null> {
        try {
            const { id, nome, sobrenome, cargo, cpf, status_func } = data

            const res: FuncionarioProps = await knex.transaction(async (trx) => {
                await trx
                    .update({
                        nome,
                        sobrenome,
                        cargo,
                        cpf,
                        status_func
                    })
                    .from('funcionarios')
                    .where({ id })

                const funcionario: FuncionarioProps[] = await trx
                    .select()
                    .from('funcionarios')
                    .where({ id })

                return funcionario[0]
            })

            return res
        } catch {
            return null
        }
    }

    async deleteFuncionario(id: string): Promise<FuncionarioProps | null> {
        try {
            const res: FuncionarioProps = await knex.transaction(async (trx) => {
                await trx
                    .update({ status_func: 0 })
                    .from('funcionarios')
                    .where({ id })

                const funcionario: FuncionarioProps[] = await trx
                    .select()
                    .from('funcionarios')
                    .where({ id })

                return funcionario[0]
            })

            return res
        } catch {
            return null
        }
    }

    async getAllFuncionarios(): Promise<FuncionarioProps[] | null> {
        try {
            const funcionarios: FuncionarioProps[] = await knex
                .select()
                .from('funcionarios')

            return funcionarios
        } catch {
            return null
        }
    }
}

