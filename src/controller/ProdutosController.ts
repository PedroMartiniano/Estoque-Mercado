import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeProdutosService } from "../factory/makeProdutosService";
import { AppError } from "../error/AppError";
import path from "path"

export class ProdutosController {
    async createProdutoHandler(req: FastifyRequest, rep: FastifyReply) {
        const produtoSchema = z.object({
            nome: z.string(),
            marca: z.string(),
            qtde: z.number().refine(value => value >= 0, { message: 'qtde cant be negative.' }),
            preco: z.number().refine(value => value > 0, { message: 'preco cant be zero.' })
        })

        const idCatSchema = z.object({
            id_cat: z.string().uuid()
        })

        const { nome, marca, qtde, preco } = produtoSchema.parse(req.body)
        const { id_cat } = idCatSchema.parse(req.params)

        const produtosService = makeProdutosService()

        try {
            const produto = await produtosService.createProdutoExecute({ id_cat, nome, marca, qtde, preco })

            return rep.status(201).send({ success: true, data: produto })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async uploadImageHandler(req: FastifyRequest, rep: FastifyReply) {
        const idProdSchema = z.object({
            id: z.string().uuid()
        })

        if (!(req as any).file) {
            throw new AppError('Imagem not founded.')
        }

        const { filename } = (req as any).file

        const imagem = path.resolve(__dirname, '../images/products', filename)

        const { id } = idProdSchema.parse(req.params)

        const produtosService = makeProdutosService()

        try {
            const produtos = await produtosService.uploadImageExecute({ id, imagem })

            return rep.status(200).send({ success: true, data: produtos })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async entradaProdutoHandler(req: FastifyRequest, rep: FastifyReply) {
        const qtdeSchema = z.object({
            qtdeProd: z.number().refine(value => value > 0, { message: 'Qtde must be greater than 0.' })
        })

        const idSchema = z.object({
            id: z.string().uuid()
        })

        const { qtdeProd } = qtdeSchema.parse(req.body)
        const { id } = idSchema.parse(req.params)

        const produtosService = makeProdutosService()
        try {
            const produto = await produtosService.entradaProdutoExecute({ id, qtdeProd })

            return rep.status(201).send({ success: true, data: produto })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getProdutoByIdHandler(req: FastifyRequest, rep: FastifyReply) {
        const idProdSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = idProdSchema.parse(req.params)

        const produtosService = makeProdutosService()

        try {
            const produto = await produtosService.getProdutoByIdExecute(id)

            if (!produto) {
                return rep.status(400).send({ success: false, message: 'None produto founded!' })
            }

            return rep.status(200).send({ success: true, data: produto })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getProdutoByIdCatHandler(req: FastifyRequest, rep: FastifyReply) {
        const idCatSchema = z.object({
            id_cat: z.string().uuid()
        })

        const { id_cat } = idCatSchema.parse(req.params)

        const produtosService = makeProdutosService()

        try {
            const produtos = await produtosService.getProdutoByIdCatExecute(id_cat)

            return rep.status(200).send({ success: true, data: produtos })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async baixaProdutoHandler(req: FastifyRequest, rep: FastifyReply) {
        const qtdeSchema = z.object({
            qtdeProd: z.number().refine(value => value > 0, { message: 'Qtde must be greater than 0.' })
        })

        const idProdSchema = z.object({
            id: z.string()
        })

        const { qtdeProd } = qtdeSchema.parse(req.body)
        const { id } = idProdSchema.parse(req.params)

        const produtosService = makeProdutosService()

        try {
            const produto = await produtosService.baixaProdutoExecute({ id, qtdeProd })

            return rep.status(200).send({ success: true, data: produto })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

    async getAllProdutosHandler(req: FastifyRequest, rep: FastifyReply) {

        const produtosService = makeProdutosService()

        try {
            const produto = await produtosService.getAllProdutos()

            return rep.status(200).send({ success: true, data: produto })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }

}