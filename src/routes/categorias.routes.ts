import { FastifyInstance } from "fastify";
import { CategoriasController } from "../controller/CategoriasController";
import { verifyJwt } from "../middlewares/verifyJwt";
import { verifyFunc } from "../middlewares/verifyFunc";

export const categoriasRoutes = async (app: FastifyInstance) => {
    const categoriasController = new CategoriasController

    app.post('/create', { preHandler: [verifyJwt, verifyFunc] }, async (req, rep) => {
        await categoriasController.createCategoriaController(req, rep)
    })

    app.get('/get/:id', async (req, rep) => {
        await categoriasController.getCategoriaByIdHandler(req, rep)
    })

    app.get('/get-all', async (req, rep) => {
        await categoriasController.getAllCategoriasHandler(req, rep)
    })
}