import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeProdutosService } from "../factory/makeProdutosService";
import { AppError } from "../error/AppError";
import { makeComprasService } from "../factory/makeComprasService";

export class ComprasController {
    async createCompraHandler(req: FastifyRequest, rep: FastifyReply) {
        const clienteSchema = z.object({
            id_cliente: z.string().uuid()
        })

        const compraSchema = z.object({
            qtde: z.number().refine(value => value > 0, { message: 'Qtde must be greater than 0.' })
        })

        const prodSchema = z.object({
            id_produto: z.string().uuid()
        })

        const { id_cliente } = clienteSchema.parse(req.user)
        const { qtde } = compraSchema.parse(req.body)
        const { id_produto } = prodSchema.parse(req.params)

        const produtosService = makeProdutosService()

        let preco_total: number
        try {
            const produto = await produtosService.getProdutoByIdExecute(id_produto)

            if (!produto) {
                throw new AppError('Product not found.', 400)
            }

            if (produto.qtde < qtde) {
                throw new AppError('unavailable qtde', 400)
            }

            preco_total = produto.preco * qtde
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }

        const comprasService = makeComprasService()

        try {
            const compra = await comprasService.createCompraExecute({ id_cliente, id_produto, qtde, preco_total })

            return rep.status(201).send({ success: true, data: compra })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getCompraByIdHandler(req: FastifyRequest, rep: FastifyReply) {
        const idCompraSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = idCompraSchema.parse(req.params)

        const comprasService = makeComprasService()
        try {
            const compra = await comprasService.getCompraByIdExecute(id)

            if (!compra) {
                return rep.status(400).send({ success: false, message: 'None compras founded!' })
            }

            return rep.status(200).send({ success: true, data: compra })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async cancelarCompraHandler(req: FastifyRequest, rep: FastifyReply) {
        const idCompraSchema = z.object({
            id: z.string().uuid()
        })

        const idUserSchema = z.object({
            id_cliente: z.string().uuid()
        })

        const { id } = idCompraSchema.parse(req.params)
        const { id_cliente } = idUserSchema.parse(req.user)

        const comprasService = makeComprasService()
        try {
            const compra = await comprasService.cancelarCompraExecute(id, id_cliente)

            return rep.status(200).send({ success: true, data: compra })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }
}