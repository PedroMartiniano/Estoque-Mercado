import { FastifyInstance } from "fastify";
import { clientesRoutes } from "./clientes.routes";
import { funcionariosRoutes } from "./funcionarios.routes";

export const routes = async (app: FastifyInstance) => {

    app.register(funcionariosRoutes, { prefix: '/funcionarios' })
    app.register(clientesRoutes, { prefix: '/clientes' })

}