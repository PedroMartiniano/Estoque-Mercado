import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSessoesService } from "../factory/makeSessoesService";
import { AppError } from "../error/AppError";
import { makeFuncionariosService } from "../factory/makeFuncionariosService";

export class SessoesController {
    async authUserHandler(req: FastifyRequest, rep: FastifyReply) {
        const sessaoSchema = z.object({
            email: z.string().email(),
            senha: z.string().min(6)
        })

        const { email, senha } = sessaoSchema.parse(req.body)

        const sessaoService = makeSessoesService()

        try {
            const sessaoUser = await sessaoService.authUserExecute({ email, senha })

            if (sessaoUser.id_func) {
                const funcionarioService = makeFuncionariosService()

                const funcionario = await funcionarioService.getFuncionarioByIdExecute(sessaoUser.id_func)

                const token = await rep.jwtSign({
                    id: sessaoUser.id,
                    id_func: sessaoUser.id_func,
                    cargo: funcionario.cargo
                })

                return rep.status(200).send({ token })
            }

            const token = await rep.jwtSign({
                id: sessaoUser.id,
                id_cliente: sessaoUser.id_cliente
            })

            return rep.status(200).send({ token })
        } catch (e: any) {
            throw new AppError(e.message, e.statusCode)
        }
    }
}