import { CreateSessaoProps, SessaoProps } from "../../@types/Sessoes";

export interface SessoesRepository {
    getSessaoByEmail(email: string): Promise<SessaoProps | null>
}