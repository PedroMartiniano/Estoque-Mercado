import { AvaliacoesProps, CreateAvaliacaoProps, GetAvaliacaoProps } from "../../@types/Avaliacoes";

export interface AvaliacoesRepository {
    createAvaliacao(data: CreateAvaliacaoProps): Promise<AvaliacoesProps | null>
    getAvaliacaoByUserProd(data: GetAvaliacaoProps): Promise<AvaliacoesProps | null>
}