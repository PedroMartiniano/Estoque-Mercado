import { AvaliacoesProps, CreateAvaliacaoProps, GetAvaliacaoProps, updateAvaliacaoProps } from "../../@types/Avaliacoes";

export interface AvaliacoesRepository {
    createAvaliacao(data: CreateAvaliacaoProps): Promise<AvaliacoesProps | null>
    getAvaliacaoByUserProd(data: GetAvaliacaoProps): Promise<AvaliacoesProps | null>
    getAvaliacaoByProd(id_produto: string): Promise<AvaliacoesProps[] | null>
    editAvaliacao(data: updateAvaliacaoProps, id: string): Promise<AvaliacoesProps | null>
}