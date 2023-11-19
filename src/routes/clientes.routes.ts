import { FastifyInstance } from "fastify";
import { ClientesController } from "../controller/ClientesController";
import { verifyJwt } from "../middlewares/verifyJwt";
import { verifyFunc } from "../middlewares/verifyFunc";

export const clientesRoutes = async (app: FastifyInstance) => {
    const clientesController = new ClientesController

    app.post('/create', async (req, rep) => {
        await clientesController.createClienteHandler(req, rep)
    })

    app.get('/get/:id', { onRequest: [verifyJwt] }, async (req, rep) => {
        await clientesController.getClienteByIdHandler(req, rep)
    })

    app.get('/get-me', { onRequest: [verifyJwt] }, async (req, rep) => {
        await clientesController.getMeClienteHandler(req, rep)
    })

    app.put('/update', { onRequest: [verifyJwt] }, async (req, rep) => {
        await clientesController.updateClienteHandler(req, rep)
    })

    app.delete('/delete/:id', { onRequest: [verifyJwt] }, async (req, rep) => {
        await clientesController.deleteClienteHandler(req, rep)
    })

    app.get('/get-all', { onRequest: [verifyJwt, verifyFunc] }, async (req, rep) => {
        await clientesController.getAllClientesHandler(req, rep)
    })
}