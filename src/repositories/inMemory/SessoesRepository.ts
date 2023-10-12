import { SessaoProps } from "../../@types/Sessoes";
import { SessoesRepository } from "../interfaces/sessoes-interface";

export class InMemorySessoesRepository implements SessoesRepository {
    private SessaoDbInMemory: SessaoProps[] = [{ id: '123', id_cliente: '321', id_func: null, email: "sessao@gmail.com", senha: '123456', status_sessao: 1 }]


    async getSessaoByEmail(email: string): Promise<SessaoProps | null> {
        const sessao = this.SessaoDbInMemory.find(sessao => sessao.email === email)

        if(!sessao){
            return null
        }

        return sessao
    }
}