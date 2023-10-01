import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeClientesService } from "../factory/makeClientesService";
import { AppError } from "../error/AppError";

export class ClientesController {
    async createClienteHandler(req: FastifyRequest, rep: FastifyReply) {
        const clienteSchema = z.object({
            nome: z.string(),
            sobrenome: z.string(),
            cpf: z.string()
        })

        const { nome, sobrenome, cpf } = clienteSchema.parse(req.body)

        const clientesService = makeClientesService()

        try {
            const cliente = await clientesService.createClientesExecute({ nome, sobrenome, cpf })

            return rep.status(201).send({ success: true, data: cliente })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getClienteByIdHandler(req: FastifyRequest, rep: FastifyReply) {
        const idSchema = z.object({
            id: z.string()
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
            id: z.string()
        })

        const { nome, sobrenome, cpf, status_cliente } = clienteSchema.parse(req.body)
        const { id } = idSchema.parse(req.params)

        const clientesService = makeClientesService()

        try {
            const cliente = await clientesService.updateClienteExecute({ id, nome, sobrenome, cpf, status_cliente })

            return rep.status(200).send({ success: true, data: cliente })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async deleteClienteHandler(req: FastifyRequest, rep: FastifyReply) {
        const idSchema = z.object({
            id: z.string()
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
}