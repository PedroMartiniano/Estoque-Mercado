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

        const doPasswordMatch = await compare(senha, user.senha)

        if (!doPasswordMatch) {
            throw new AppError('email or password incorect.')
        }

        return user
    }
}