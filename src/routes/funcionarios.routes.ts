import { FastifyInstance } from "fastify";
import { FuncionariosController } from "../controller/FuncionariosController";

export const funcionariosRoutes = async (app: FastifyInstance) => {
    const funcionariosController = new FuncionariosController

    app.post('/create', async (req, rep) => {
        await funcionariosController.createFuncionarioHandler(req, rep)
    })

    app.get('/get/:id', async (req, rep) => {
        await funcionariosController.getFuncionarioByIdHandler(req, rep)
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