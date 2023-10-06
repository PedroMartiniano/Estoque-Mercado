import { AvaliacoesProps, CreateAvaliacaoProps } from "../@types/Avaliacoes";
import { AppError } from "../error/AppError";
import { openai } from "../lib/openai";
import { AvaliacoesRepository } from "../repositories/interfaces/avaliacoes-interface";

export class AvaliacoesService {
    constructor(private avaliacoesRepository: AvaliacoesRepository) { }

    async createAvaliacaoExecute(data: CreateAvaliacaoProps): Promise<any> {
        const prompt: string = `By the message in ***, return only "P" if the message is positive, or only "N" if the message is negative, if you cant tell, return null, as the example: {request: "I love the product!", response: "P"} or {request: "tomato", response: null}.
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

        const verifica_msg = res.choices[0].message.content || undefined

        const avaliacao = await this.avaliacoesRepository.createAvaliacao({ ...data, verifica_msg })

        if (avaliacao === null) {
            throw new AppError('Error on creating avaliacao', 500)
        }
        
        return avaliacao
    }
}