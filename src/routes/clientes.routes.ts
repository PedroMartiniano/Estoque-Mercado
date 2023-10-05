import { FastifyInstance } from "fastify";
import { ClientesController } from "../controller/ClientesController";
import { verifyJwt } from "../middlewares/verifyJwt";

export const clientesRoutes = async (app: FastifyInstance) => {
    const clientesController = new ClientesController

    app.post('/create', async (req, rep) => {
        await clientesController.createClienteHandler(req, rep)
    })

    // app.addHook('onRequest', verifyJwt)

    app.get('/get/:id', async (req, rep) => {
        await clientesController.getClienteByIdHandler(req, rep)
    })

    app.get('/get-me', async (req, rep) => {
        await clientesController.getMeClienteHandler(req, rep)
    })

    app.put('/update', async (req, rep) => {
        await clientesController.updateClienteHandler(req, rep)
    })

    app.delete('/delete/:id', async (req, rep) => {
        await clientesController.deleteClienteHandler(req, rep)
    })

    app.get('/get-all', async (req, rep) => {
        await clientesController.getAllClientesHandler(req, rep)
    })
}