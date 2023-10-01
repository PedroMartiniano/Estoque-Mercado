import { FastifyInstance } from "fastify";
import { ClientesController } from "../controller/ClientesController";

export const clientesRoutes = async (app: FastifyInstance) => {
    const clientesController = new ClientesController

    app.post('/create', async (req, rep) => {
        await clientesController.createClienteHandler(req, rep)
    })

    app.get('/get/:id', async (req, rep) => {
        await clientesController.getClienteByIdHandler(req, rep)
    })

    app.put('/update/:id', async (req, rep) => {
        await clientesController.updateClienteHandler(req, rep)
    })
}