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

    async getCategoriaByIdHandler(req: FastifyRequest, rep: FastifyReply) {
        const idCatSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = idCatSchema.parse(req.params)

        const categoriasService = makeCategoriasService()

        try {
            const categoria = await categoriasService.getCategoriaByIdExecute(id)

            if (!categoria) {
                return rep.status(400).send({ success: false, message: 'No categoria found' })
            }

            return rep.status(200).send({ success: true, data: categoria })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getAllCategoriasHandler(req: FastifyRequest, rep: FastifyReply) {
        const categoriasService = makeCategoriasService()

        try {
            const categorias = await categoriasService.getAllCategoriasExecute()

            if (!categorias[0]) {
                return rep.status(400).send({ success: false, message: 'None categorias founded!' })
            }

            return rep.status(200).send({ success: true, data: categorias })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }
}