import { SessaoProps } from "../../@types/Sessoes";
import { SessoesRepository } from "../interfaces/sessoes-interface";
import { hash } from "bcrypt";

export class InMemorySessoesRepository implements SessoesRepository {

    private SessaoDbInMemory: SessaoProps[] = [{ id: '123', id_cliente: '321', id_func: null, email: "cliente@teste.com", senha: '123456', status_sessao: 1 }]


    async getSessaoByEmail(email: string): Promise<SessaoProps | null> {
        const sessao = this.SessaoDbInMemory.find(sessao => sessao.email === email)

        if (!sessao) {
            return null
        }

        return sessao
    }

    // métodos abaixo não existentes na classe real do banco de dados
    // foram feitos afim de otimizar testes automátizados
    async createHashPassword() {
        const hashPassword = await hash('123456', 4)

        this.SessaoDbInMemory[0].senha = hashPassword
    }

    deactivateSessao() {
        this.SessaoDbInMemory[0].status_sessao = 0
    }
}