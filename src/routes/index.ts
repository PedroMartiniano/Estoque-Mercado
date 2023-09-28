import { clientesRoutes } from "./clientes.routes";
import { funcionariosRoutes } from "./funcionarios.routes";
import { FastifyInstance } from "fastify";

export const routes = (app: FastifyInstance) => {

    app.register(clientesRoutes, { prefix: '/clientes' })
    app.register(funcionariosRoutes, { prefix: '/funcionarios' })

}