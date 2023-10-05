import { FastifyInstance } from "fastify";
import { ProdutosController } from "../controller/ProdutosController";
import { upload } from "../app";

export const produtosRoutes = async (app: FastifyInstance) => {
    const produtosController = new ProdutosController

    app.post('/create/:id_cat', async (req, rep) => {
        await produtosController.createProdutoHandler(req, rep)
    })

    app.post('/uploadImage/:id', { preHandler: upload.single('product') }, async (req, rep) => {
        await produtosController.uploadImageHandler(req, rep)
    })

    app.post('/entrada/:id', async (req, rep) => {
        await produtosController.entradaProdutoHandler(req, rep)
    })

    app.get('/get/:id', async (req, rep) => {
        await produtosController.getProdutoByIdHandler(req, rep)
    })

    app.get('/get-cat/:id_cat', async (req, rep) => {
        await produtosController.getProdutoByIdCatHandler(req, rep)
    })

    app.post('/baixa/:id', async (req, rep) => {
        await produtosController.baixaProdutoHandler(req, rep)
    })
}