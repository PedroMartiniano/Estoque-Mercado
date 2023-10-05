import { compare } from "bcrypt";
import { CreateSessaoProps, SessaoProps } from "../@types/Sessoes";
import { AppError } from "../error/AppError";
import { SessoesRepository } from "../repositories/interfaces/sessoes-interface";

export class SessoesService {
    constructor(private sessoesRepository: SessoesRepository) { }

    async authUserExecute(data: CreateSessaoProps): Promise<SessaoProps> {
        const { email, senha } = data

        const user = await this.sessoesRepository.getSessaoByEmail(email)

        if (user === null) {
            throw new AppError('Error on authenticate user. Try Again.', 500)
        }

        if (!user) {
            throw new AppError('Email or password incorect.')
        }

        if (user.status_sessao === 0) {
            throw new AppError('User disabled.')
        }

        const doPasswordMatch = await compare(senha, user.senha)

        if (!doPasswordMatch) {
            throw new AppError('email or password incorect.')
        }

        return user
    }

    async getSessaoByEmailExecute(email: string): Promise<boolean> {
        const sessao = await this.sessoesRepository.getSessaoByEmail(email)

        if (sessao === null) {
            throw new AppError('Error on verifying email. Try again!', 500)
        }

        return (sessao) ? true : false
    }
}