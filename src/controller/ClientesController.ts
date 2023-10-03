import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeClientesService } from "../factory/makeClientesService";
import { AppError } from "../error/AppError";
import { makeSessoesService } from "../factory/makeSessoesService";

export class ClientesController {
    async createClienteHandler(req: FastifyRequest, rep: FastifyReply) {
        const clienteSchema = z.object({
            nome: z.string(),
            sobrenome: z.string(),
            cpf: z.string(),
            email: z.string().email(),
            senha: z.string().min(6)
        })

        const { nome, sobrenome, cpf, email, senha } = clienteSchema.parse(req.body)

        const sessaoService = makeSessoesService()

        try {
            const doEmailExist = await sessaoService.getSessaoByEmailExecute(email)

            if (doEmailExist) {
                return rep.status(400).send({ success: false, message: "Email already exists." })
            }
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }

        const clientesService = makeClientesService()

        try {
            const cliente = await clientesService.createClientesExecute({ nome, sobrenome, cpf }, { email, senha })

            return rep.status(201).send({ success: true, data: cliente })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getClienteByIdHandler(req: FastifyRequest, rep: FastifyReply) {
        const idSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = idSchema.parse(req.params)

        const clientesService = makeClientesService()

        try {
            const cliente = await clientesService.getClienteByIdExecute(id)

            if (!cliente) {
                return rep.status(400).send({ success: false, message: "Cliente not found!" })
            }

            return rep.status(200).send({ success: true, data: cliente })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async updateClienteHandler(req: FastifyRequest, rep: FastifyReply) {
        const clienteSchema = z.object({
            nome: z.string(),
            sobrenome: z.string(),
            cpf: z.string(),
            status_cliente: z.number()
        })

        const idSchema = z.object({
            id_cliente: z.string().uuid()
        })

        const { nome, sobrenome, cpf, status_cliente } = clienteSchema.parse(req.body)
        const { id_cliente } = idSchema.parse(req.user)

        const clientesService = makeClientesService()

        try {
            const id = id_cliente
            const cliente = await clientesService.updateClienteExecute({ id, nome, sobrenome, cpf, status_cliente })

            return rep.status(200).send({ success: true, data: cliente })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async deleteClienteHandler(req: FastifyRequest, rep: FastifyReply) {
        const idSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = idSchema.parse(req.params)

        const clientesService = makeClientesService()

        try {
            const cliente = await clientesService.deleteClienteExecute(id)

            return rep.status(200).send({ success: true, data: cliente })
        } catch (e: any) {
            throw new AppError(e.message, e.StatusCode)
        }
    }

    async getAllClientesHandler(req: FastifyRequest, rep: FastifyReply) {
        const clientesService = makeClientesService()

        try {
            const clientes = await clientesService.getAllClientesExecute()

            if (!clientes[0]) {
                return rep.status(400).send({ success: false, message: 'None clientes founded!' })
            }

            return rep.status(200).send({ success: false, data: clientes })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getMeClienteHandler(req: FastifyRequest, rep: FastifyReply) {
        const idClienteSchema = z.object({
            id_cliente: z.string().uuid()
        })

        const { id_cliente } = idClienteSchema.parse(req.user)

        const clientesService = makeClientesService()

        try {
            const cliente = await clientesService.getClienteByIdExecute(id_cliente)

            return rep.status(200).send({ success: true, data: cliente })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }
}