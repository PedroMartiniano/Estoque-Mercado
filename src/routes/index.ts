import { FastifyInstance } from "fastify";
import { clientesRoutes } from "./clientes.routes";
import { funcionariosRoutes } from "./funcionarios.routes";
import { sessoesRoutes } from "./sessoes.routes";
import { categoriasRoutes } from "./categorias.routes";
import { produtosRoutes } from "./produtos.routes";
import { comprasRoutes } from "./compras.routes";
import { avaliacoesRoutes } from "./avaliacoes.routes";

export const routes = async (app: FastifyInstance) => {

    app.register(funcionariosRoutes, { prefix: '/funcionarios' })
    app.register(clientesRoutes, { prefix: '/clientes' })
    app.register(sessoesRoutes, { prefix: '/' })
    app.register(categoriasRoutes, { prefix: '/categorias' })
    app.register(produtosRoutes, { prefix: '/produtos' })
    app.register(comprasRoutes, { prefix: '/compras' })
    app.register(avaliacoesRoutes, { prefix: '/avaliacoes' })
}