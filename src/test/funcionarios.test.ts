import { describe, test, expect, beforeEach } from "vitest";
import { InMemoryFuncionariosRepository } from "../repositories/inMemory/FuncionariosRepository";
import { FuncionariosService } from "../services/FuncionariosService";
import { CreateFuncionarioProps, FuncionarioProps } from "../@types/Funcionarios";
import { CreateSessaoProps } from "../@types/Sessoes";
import { v4 as uuid } from "uuid";
import { AppError } from "../error/AppError";

describe('Should test all funcionarios components', () => {
    let inMemoryFuncRepository: InMemoryFuncionariosRepository
    let funcionariosService: FuncionariosService
    let funcTest1: CreateFuncionarioProps = {
        nome: 'first',
        sobrenome: 'func',
        cargo: 'GERENTE',
        cpf: '1234567910'
    }
    let funcTest2: CreateFuncionarioProps = {
        nome: 'second',
        sobrenome: 'func',
        cargo: 'FUNCIONARIO',
        cpf: '12345678911'
    }
    let sessaoTest1: CreateSessaoProps = {
        email: 'func@teste.com',
        senha: '123456'
    }
    let sessaoTest2: CreateSessaoProps = {
        email: 'func2@teste.com',
        senha: '123456'
    }

    beforeEach(() => {
        inMemoryFuncRepository = new InMemoryFuncionariosRepository
        funcionariosService = new FuncionariosService(inMemoryFuncRepository)
    })

    test('should create a funcionario successfully', async () => {
        const func = await funcionariosService.createFuncionarioExecute(funcTest1, sessaoTest1)

        expect(func.id).toEqual('0')
    })

    test('should try create a funcionario with an existing cpf', async () => {
        const func1 = await funcionariosService.createFuncionarioExecute(funcTest1, sessaoTest1)

        await expect(
            funcionariosService.createFuncionarioExecute({
                ...funcTest2,
                cpf: func1.cpf
            },
                sessaoTest2
            ))
            .rejects.toBeInstanceOf(AppError)
    })

})