import { FastifyInstance } from "fastify";
import { clientesRoutes } from "./clientes.routes";
import { funcionariosRoutes } from "./funcionarios.routes";
import { sessoesRoutes } from "./sessoes.routes";
import { categoriasRoutes } from "./categorias.routes";

export const routes = async (app: FastifyInstance) => {

    app.register(funcionariosRoutes, { prefix: '/funcionarios' })
    app.register(clientesRoutes, { prefix: '/clientes' })
    app.register(sessoesRoutes, { prefix: '/' })
    app.register(categoriasRoutes, {prefix: '/categorias'})
}