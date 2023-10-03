import { FastifyInstance } from "fastify";
import { CategoriasController } from "../controller/CategoriasController";

export const categoriasRoutes = async (app: FastifyInstance) => {
    const categoriasController = new CategoriasController

    app.post('/create', async (req, rep) => {
        await categoriasController.createCategoriaController(req, rep)
    })
}