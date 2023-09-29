import { CreateFuncionarioProps, FuncionarioProps } from "../../@types/Funcionario";

export interface FuncionariosRepository {
    createFuncionario(data: CreateFuncionarioProps): Promise<FuncionarioProps | null>
    getFuncionarioById(id: string): Promise<FuncionarioProps | null>
}