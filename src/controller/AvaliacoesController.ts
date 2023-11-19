import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeComprasService } from "../factory/makeComprasService";
import { AppError } from "../error/AppError";
import { makeAvaliacoesService } from "../factory/makeAvaliacoesService";


export class AvaliacoesController {
    async createAvaliacaoHandler(req: FastifyRequest, rep: FastifyReply) {
        const avaliacaoSchema = z.object({
            nota: z.number().refine(value => value >= 0 && value <= 5, { message: 'Nota not valid.' }),
            menssagem: z.string()
        })

        const idProdSchema = z.object({
            id_produto: z.string().uuid()
        })

        const idClienteSchema = z.object({
            id_cliente: z.string().uuid()
        })

        const { nota, menssagem } = avaliacaoSchema.parse(req.body)
        const { id_produto } = idProdSchema.parse(req.params)
        const { id_cliente } = idClienteSchema.parse(req.user)
        const comprasService = makeComprasService()

        try {
            const compras = await comprasService.getUserProdCompraExecute({ id_cliente, id_produto })
            if (compras.length === 0) {
                throw new AppError('User has no buys on this product', 400)
            }
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }

        const avaliacoesService = makeAvaliacoesService()

        let verifica_msg = null

        try {
            const avaliacao = await avaliacoesService.createAvaliacaoExecute({ id_cliente, id_produto, nota, menssagem, verifica_msg })

            return rep.status(200).send({ success: true, data: avaliacao })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getAvaliacaoByUserProdHandler(req: FastifyRequest, rep: FastifyReply) {
        const idClienteSchema = z.object({
            id_cliente: z.string().uuid()
        })

        const idProdSchema = z.object({
            id_produto: z.string().uuid()
        })

        const { id_cliente } = idClienteSchema.parse(req.user)
        const { id_produto } = idProdSchema.parse(req.params)

        const avaliacoesService = makeAvaliacoesService()
        try {
            const avaliacoes = await avaliacoesService.getAvaliacaoByUserProdExecute({ id_cliente, id_produto })

            if (!avaliacoes) {
                return rep.status(400).send({ success: false, message: 'None avaliacoes founded!' })
            }

            return rep.status(200).send({ success: true, data: avaliacoes })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getAvaliacoesByProdHandler(req: FastifyRequest, rep: FastifyReply) {
        const idProdSchema = z.object({
            id_produto: z.string().uuid()
        })

        const { id_produto } = idProdSchema.parse(req.params)

        const avaliacoesService = makeAvaliacoesService()

        try {
            const avaliacoes = await avaliacoesService.getAvaliacaoByProdExecute(id_produto)

            if (!avaliacoes[0]) {
                return rep.status(400).send({ success: false, message: 'None avaliacoes founded!' })
            }

            return rep.status(200).send({ success: true, data: avaliacoes })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }
}