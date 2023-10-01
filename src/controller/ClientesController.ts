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
}