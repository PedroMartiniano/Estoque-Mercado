import { FastifyInstance } from "fastify";
import { AvaliacoesController } from "../controller/AvaliacoesController";
import { verifyJwt } from "../middlewares/verifyJwt";

export const avaliacoesRoutes = async (app: FastifyInstance) => {
    const avaliacoesController = new AvaliacoesController

    app.addHook('onRequest', verifyJwt)

    app.post('/create/:id_produto', async (req, rep) => {
        await avaliacoesController.createAvaliacaoHandler(req, rep)
    })
}