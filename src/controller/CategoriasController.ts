import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { z } from "zod";
import { makeCategoriasService } from "../factory/makeCategoriasService";
import { AppError } from "../error/AppError";

export class CategoriasController {
    async createCategoriaController(req: FastifyRequest, rep: FastifyReply) {
        const categoriaSchema = z.object({
            nome: z.string()
        })

        const { nome } = categoriaSchema.parse(req.body)

        const categoriasService = makeCategoriasService()

        try {
            const categoria = await categoriasService.createCategoriaExecute(nome.toUpperCase())

            return rep.status(201).send({ success: true, data: categoria })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }
}