import { FastifyReply, FastifyRequest } from "fastify"

export const verifyFunc = async (req: FastifyRequest, rep: FastifyReply) => {
    const { id_func } = req.user

    if (!id_func) {
        return rep.status(401).send({ message: 'Unauthorized client.' })
    }
}