import { FastifyInstance } from "fastify";
import { ComprasController } from "../controller/ComprasController";
import { verifyJwt } from "../middlewares/verifyJwt";

export const comprasRoutes = async (app: FastifyInstance) => {
    const comprasController = new ComprasController

    app.addHook('onRequest', verifyJwt)

    app.post('/create/:id_produto', async (req, rep) => {
        await comprasController.createCompraHandler(req, rep)
    })

    app.get('/get/:id', async (req, rep) => {
        await comprasController.getCompraByIdHandler(req, rep)
    })

    app.delete('/cancel/:id', async (req, rep) => {
        await comprasController.cancelarCompraHandler(req, rep)
    })
}