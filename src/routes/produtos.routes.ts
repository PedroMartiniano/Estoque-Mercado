import { FastifyInstance } from "fastify";
import { ProdutosController } from "../controller/ProdutosController";
import { upload } from "../app";
import { verifyJwt } from "../middlewares/verifyJwt";
import { verifyFunc } from "../middlewares/verifyFunc";

export const produtosRoutes = async (app: FastifyInstance) => {
    const produtosController = new ProdutosController

    app.get('/get/:id', async (req, rep) => {
        await produtosController.getProdutoByIdHandler(req, rep)
    })

    app.get('/get-cat/:id_cat', async (req, rep) => {
        await produtosController.getProdutoByIdCatHandler(req, rep)
    })

    app.get('/get-all', async (req, rep) => {
        await produtosController.getAllProdutosHandler(req, rep)
    })

    app.post('/create/:id_cat', { preHandler: [verifyJwt, verifyFunc] }, async (req, rep) => {
        await produtosController.createProdutoHandler(req, rep)
    })

    app.put('/uploadImage/:id', { preHandler: [verifyJwt, verifyFunc, upload.single('product')] }, async (req, rep) => {
        await produtosController.uploadImageHandler(req, rep)
    })

    app.post('/entrada/:id', { preHandler: [verifyJwt, verifyFunc] }, async (req, rep) => {
        await produtosController.entradaProdutoHandler(req, rep)
    })

    app.post('/baixa/:id', { preHandler: [verifyJwt, verifyFunc] }, async (req, rep) => {
        await produtosController.baixaProdutoHandler(req, rep)
    })
}