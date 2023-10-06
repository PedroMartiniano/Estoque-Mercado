import { AvaliacoesProps, CreateAvaliacaoProps } from "../../@types/Avaliacoes";

export interface AvaliacoesRepository {
    createAvaliacao(data: CreateAvaliacaoProps): Promise<AvaliacoesProps | null>
}