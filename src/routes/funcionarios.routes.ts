import { FastifyInstance } from "fastify";
import { FuncionariosController } from "../controller/FuncionariosController";

export const funcionariosRoutes = async (app: FastifyInstance) => {
    const funcionariosController = new FuncionariosController

    app.post('/create', async (req, rep) => {
        await funcionariosController.createFuncionarioHandler(req, rep)
    })
}