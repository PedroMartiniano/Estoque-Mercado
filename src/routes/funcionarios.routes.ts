import { FastifyInstance } from "fastify";
import { FuncionariosController } from "../controller/FuncionariosController";

export const funcionariosRoutes = async (app: FastifyInstance) => {
    const funcionariosController = new FuncionariosController

    app.post('/create', (req, rep) => {
        funcionariosController.createFuncionarioHandler(req, rep)
    })
}