import { FastifyInstance } from "fastify";
import { SessoesController } from "../controller/SessoesController";

export const sessoesRoutes = async (app: FastifyInstance) => {
    const sessoesController = new SessoesController

    app.post('/login', async (req, rep) => {
        await sessoesController.authUserHandler(req, rep)
    })
}