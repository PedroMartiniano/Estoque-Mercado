import { FastifyInstance } from "fastify";
import { ClientesController } from "../controller/ClientesController";

export const clientesRoutes = async (app: FastifyInstance) => {
    const clientesController = new ClientesController

    app.post('/create', async (req, rep) => {
        await clientesController.createClienteHandler(req, rep)
    })
}