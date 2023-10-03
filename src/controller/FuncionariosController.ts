import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFuncionariosService } from '../factory/makeFuncionariosService'
import { AppError } from '../error/AppError'
import { makeSessoesService } from '../factory/makeSessoesService'

export class FuncionariosController {
    async createFuncionarioHandler(req: FastifyRequest, rep: FastifyReply) {
        const funcionarioSchema = z.object({
            nome: z.string(),
            sobrenome: z.string(),
            cargo: z.enum(['FUNCIONARIO', 'GERENTE']),
            cpf: z.string().length(11),
            email: z.string().email(),
            senha: z.string().min(6)
        })

        const { nome, sobrenome, cargo, cpf, email, senha } = funcionarioSchema.parse(req.body)

        const sessaoService = makeSessoesService()

        try {
            const doEmailExist = await sessaoService.getSessaoByEmailExecute(email)

            if (doEmailExist) {
                return rep.status(400).send({ success: false, message: 'Email already exists.' })
            }
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }

        const funcionarioService = makeFuncionariosService()

        try {
            const funcionario = await funcionarioService.createFuncionarioExecute({ nome, sobrenome, cargo, cpf }, { email, senha })

            return rep.status(201).send({ success: true, data: funcionario })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getFuncionarioByIdHandler(req: FastifyRequest, rep: FastifyReply) {
        const idSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = idSchema.parse(req.params)

        const funcionarioService = makeFuncionariosService()

        try {
            const funcionario = await funcionarioService.getFuncionarioByIdExecute(id)

            if (!funcionario) {
                return rep.status(400).send({ success: false, message: 'Funcionario not found!' })
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
            id: z.string().uuid()
        })

        const { nome, sobrenome, cargo, cpf, status_func } = funcionarioSchema.parse(req.body)

        const { id } = idSchema.parse(req.params)

        const funcionarioService = makeFuncionariosService()
        try {
            const funcionario = await funcionarioService.updateFuncionarioExecute({ id, nome, sobrenome, cargo, cpf, status_func })

            return rep.status(200).send({ success: true, data: funcionario })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async deleteFuncionarioHandler(req: FastifyRequest, rep: FastifyReply) {
        const idSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = idSchema.parse(req.params)

        const funcionarioService = makeFuncionariosService()

        try {
            const funcionario = await funcionarioService.deleteFuncionarioExecute(id)

            return rep.status(200).send({ success: false, data: funcionario })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getAllFuncionariosHandler(req: FastifyRequest, rep: FastifyReply) {
        const funcionarioService = makeFuncionariosService()

        try {
            const funcionarios = await funcionarioService.getAllFuncionariosExecute()

            if (!funcionarios[0]) {
                return rep.status(400).send({ success: false, message: 'None funcionarios founded!' })
            }

            return rep.status(200).send({ success: true, data: funcionarios })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getMeFuncHandler(req: FastifyRequest, rep: FastifyReply) {
        const idFuncSchema = z.object({
            id_func: z.string().uuid()
        })

        const { id_func } = idFuncSchema.parse(req.user)

        const funcionariosService = makeFuncionariosService()

        try {
            const funcionario = await funcionariosService.getFuncionarioByIdExecute(id_func)

            return rep.status(200).send({ success: true, data: funcionario })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }
}