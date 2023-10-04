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
}