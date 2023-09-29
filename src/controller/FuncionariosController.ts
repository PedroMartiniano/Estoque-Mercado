import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFuncionarioService } from '../factory/makeFuncionarioService'
import { AppError } from '../error/AppError'

export class FuncionariosController {
    async createFuncionarioHandler(req: FastifyRequest, rep: FastifyReply) {
        const funcionarioSchema = z.object({
            nome: z.string(),
            sobrenome: z.string(),
            cargo: z.string(),
            cpf: z.string().length(11)
        })

        const { nome, sobrenome, cargo, cpf } = funcionarioSchema.parse(req.body)

        const funcionarioService = makeFuncionarioService()

        try {
            const funcionario = await funcionarioService.createFuncionarioExecute({ nome, sobrenome, cargo, cpf })

            return rep.status(201).send(funcionario)
        } catch (err: any) {
            return rep.status(err.statusCode).send(err.message)

            throw new AppError(err.message, err.statusCode) // não está fazendo o catch do error
        }
    }
}