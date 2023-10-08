import { AvaliacoesProps, CreateAvaliacaoProps, GetAvaliacaoProps } from "../@types/Avaliacoes";
import { AppError } from "../error/AppError";
import { openai } from "../lib/openai";
import { AvaliacoesRepository } from "../repositories/interfaces/avaliacoes-interface";

export class AvaliacoesService {
    constructor(private avaliacoesRepository: AvaliacoesRepository) { }

    async createAvaliacaoExecute(data: CreateAvaliacaoProps): Promise<AvaliacoesProps> {
        const avaliacaoUser = await this.avaliacoesRepository.getAvaliacaoByUserProd({ id_cliente: data.id_cliente, id_produto: data.id_produto })

        if (avaliacaoUser === null) {
            throw new AppError('Error on getting user avaliacoes', 500)
        }

        if (avaliacaoUser) {
            throw new AppError('User has already avaliated this product')
        }

        const prompt: string = `By the message in ***, that is a assessment for a product from a client, return only "P" if the message is positive, or only "N" if the message is negative, if you can't tell, return only "N", as the example: {request: "I love the product!", response: "P"} or {request: "tomato", response: "N"}.
        ***${data.menssagem}***
        `

        const res = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a professional sell mannager.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0
        })

        let verifica_msg = res.choices[0].message.content || null

        const avaliacao = await this.avaliacoesRepository.createAvaliacao({ ...data, verifica_msg })

        if (avaliacao === null) {
            throw new AppError('Error on creating avaliacao', 500)
        }

        return avaliacao
    }

    async getAvaliacaoByUserProdExecute(data: GetAvaliacaoProps): Promise<AvaliacoesProps> {
        const avaliacao = await this.avaliacoesRepository.getAvaliacaoByUserProd(data)

        if (avaliacao === null) {
            throw new AppError('Error on getting avaliacao', 500)
        }

        return avaliacao
    }
}