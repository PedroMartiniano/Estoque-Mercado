import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
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
            throw new AppError(err.message, err.statusCode)
        }
    }

    async getFuncionarioByIdHandler(req: FastifyRequest, rep: FastifyReply) {
        const idSchema = z.object({
            id: z.string()
        })

        const { id } = idSchema.parse(req.params)

        const funcionarioService = makeFuncionarioService()

        try {
            const funcionario = await funcionarioService.getFuncionarioByIdExecute(id)

            if (!funcionario) {
                return rep.status(400).send({ success: false, message: 'User not found!' })
            }

            return rep.status(200).send({ success: true, data: funcionario })
        } catch {
            throw new AppError('Error! Try again.', 500)
        }
    }
}