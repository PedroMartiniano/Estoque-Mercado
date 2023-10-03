import { FastifyInstance } from "fastify";
import { FuncionariosController } from "../controller/FuncionariosController";
import { verifyJwt } from "../middlewares/verifyJwt";
import { verifyCargo } from "../middlewares/verifyCargo";
import { verifyFunc } from "../middlewares/verifyFunc";

export const funcionariosRoutes = async (app: FastifyInstance) => {
    const funcionariosController = new FuncionariosController

    app.addHook('onRequest', verifyJwt)
    app.addHook('onRequest', verifyFunc)

    app.post('/create', { onRequest: [verifyCargo('GERENTE')] }, async (req, rep) => {
        await funcionariosController.createFuncionarioHandler(req, rep)
    })

    app.get('/get/:id', async (req, rep) => {
        await funcionariosController.getFuncionarioByIdHandler(req, rep)
    })

    app.get('/get-me', async (req, rep) => {
        await funcionariosController.getMeFuncHandler(req, rep)
    })

    app.put('/update/:id', async (req, rep) => {
        await funcionariosController.updateFuncionarioHandler(req, rep)
    })

    app.delete('/delete/:id', async (req, rep) => {
        await funcionariosController.deleteFuncionarioHandler(req, rep)
    })

    app.get('/get-all', async (req, rep) => {
        await funcionariosController.getAllFuncionariosHandler(req, rep)
    })
}