import '@fastify/jwt'

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user: {
            id: string
            id_cliente?: string
            id_func?: string
            cargo?: 'FUNCIONARIO' | 'GERENTE'
        }
    }
}