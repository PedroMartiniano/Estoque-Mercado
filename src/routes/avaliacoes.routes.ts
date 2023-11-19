import { FastifyInstance } from "fastify";
import { AvaliacoesController } from "../controller/AvaliacoesController";
import { verifyJwt } from "../middlewares/verifyJwt";

export const avaliacoesRoutes = async (app: FastifyInstance) => {
    const avaliacoesController = new AvaliacoesController

    app.addHook('onRequest', verifyJwt)

    app.post('/create/:id_produto', async (req, rep) => {
        await avaliacoesController.createAvaliacaoHandler(req, rep)
    })

    app.get('/get/:id_produto', async (req, rep) => {
        await avaliacoesController.getAvaliacaoByUserProdHandler(req, rep)
    })

    app.get('/get-prod/:id_produto', async (req, rep) => {
        await avaliacoesController.getAvaliacoesByProdHandler(req, rep)
    })
}