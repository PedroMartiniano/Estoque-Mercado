import { FastifyReply, FastifyRequest } from "fastify"
import { AppError } from "../error/AppError"

export const verifyCargo = (cargoRequest: string) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        const { cargo } = req.user

        if (cargo !== cargoRequest) {
            return rep.status(401).send({ message: 'Unauthorized role.' })
        }
    }
}