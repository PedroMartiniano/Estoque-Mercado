import { CreateFuncionarioProps, FuncionarioProps } from "../../@types/Funcionario";

export interface FuncionariosRepository {
    createFuncionario(data: CreateFuncionarioProps): Promise<FuncionarioProps | null>
    getFuncionarioById(id: string): Promise<FuncionarioProps | null>
    getFuncionarioByCpf(cpf: string): Promise<FuncionarioProps | null>
    updateFuncionario(data: FuncionarioProps): Promise<FuncionarioProps | null>
}