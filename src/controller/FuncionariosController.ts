import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFuncionarioService } from '../factory/makeFuncionarioService'
import { AppError } from '../error/AppError'

export class FuncionariosController {
    async createFuncionarioHandler(req: FastifyRequest, rep: FastifyReply) {
        const funcionarioSchema = z.object({
            nome: z.string(),
            sobrenome: z.string(),
            cargo: z.enum(['FUNCIONARIO', 'GERENTE']),
            cpf: z.string().length(11)
        })

        const { nome, sobrenome, cargo, cpf } = funcionarioSchema.parse(req.body)

        const funcionarioService = makeFuncionarioService()

        try {
            const funcionario = await funcionarioService.createFuncionarioExecute({ nome, sobrenome, cargo, cpf })

            return rep.status(201).send({ success: true, data: funcionario })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
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
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async updateFuncionarioHandler(req: FastifyRequest, rep: FastifyReply) {
        const funcionarioSchema = z.object({
            nome: z.string(),
            sobrenome: z.string(),
            cargo: z.enum(['FUNCIONARIO', 'GERENTE']),
            cpf: z.string().length(11),
            status_func: z.number()
        })

        const idSchema = z.object({
            id: z.string()
        })

        const { nome, sobrenome, cargo, cpf, status_func } = funcionarioSchema.parse(req.body)

        const { id } = idSchema.parse(req.params)

        const funcionarioService = makeFuncionarioService()
        try {
            const funcionario = await funcionarioService.updateFuncionarioExecute({ id, nome, sobrenome, cargo, cpf, status_func })

            return rep.status(200).send({ success: true, data: funcionario })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async deleteFuncionarioHandler(req: FastifyRequest, rep: FastifyReply) {
        const idSchema = z.object({
            id: z.string()
        })

        const { id } = idSchema.parse(req.params)

        const funcionarioService = makeFuncionarioService()

        try {
            const funcionario = await funcionarioService.deleteFuncionarioExecute(id)

            return rep.status(200).send({ success: false, data: funcionario })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getAllFuncionariosHandler(req: FastifyRequest, rep: FastifyReply) {
        const funcionarioService = makeFuncionarioService()

        try {
            const funcionarios = await funcionarioService.getAllFuncionariosExecute()

            return rep.status(200).send({ success: true, data: funcionarios })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }
}