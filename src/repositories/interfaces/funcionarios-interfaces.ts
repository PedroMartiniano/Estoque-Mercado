import { CreateFuncionarioProps, FuncionarioProps } from "../../@types/Funcionarios";
import { CreateSessaoProps } from "../../@types/Sessoes";

export interface FuncionariosRepository {
    createFuncionario(data: CreateFuncionarioProps, sessao: CreateSessaoProps): Promise<FuncionarioProps | null>
    getFuncionarioById(id: string): Promise<FuncionarioProps | null>
    getFuncionarioByCpf(cpf: string): Promise<FuncionarioProps | null>
    updateFuncionario(data: FuncionarioProps): Promise<FuncionarioProps | null>
    deleteFuncionario(id: string): Promise<FuncionarioProps | null>
    getAllFuncionarios(): Promise<FuncionarioProps[] | null>
}