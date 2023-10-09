import { describe, test, expect, beforeEach } from "vitest";
import { InMemoryFuncionariosRepository } from "../repositories/inMemory/FuncionariosRepository";
import { FuncionariosService } from "../services/FuncionariosService";
import { CreateFuncionarioProps, FuncionarioProps } from "../@types/Funcionarios";
import { CreateSessaoProps } from "../@types/Sessoes";
import { AppError } from "../error/AppError";

describe('Should test all funcionarios service components', () => {
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

    test('should get a funcinario by id', async () => {
        const func = await funcionariosService.createFuncionarioExecute(funcTest1, sessaoTest1)

        expect(await funcionariosService.getFuncionarioByIdExecute(func.id)).toEqual(func)
    })

    test('should not get a funcionario by id', async () => {
        await expect(funcionariosService.getFuncionarioByIdExecute('invalid-id')).rejects.toBeInstanceOf(AppError)
    })

    test('should update a funcionario successfully', async () => {
        const func = await funcionariosService.createFuncionarioExecute(funcTest1, sessaoTest1)

        const newFunc = await funcionariosService.updateFuncionarioExecute({ id: func.id, nome: 'updated', sobrenome: 'func', cargo: 'FUNCIONARIO', cpf: '12345678910', status_func: 1 })

        expect(newFunc).toEqual({ id: newFunc.id, nome: 'updated', sobrenome: 'func', cargo: 'FUNCIONARIO', cpf: '12345678910', status_func: 1 })
    })

    test('should update a funcionario with an existing cpf', async () => {
        const func1 = await funcionariosService.createFuncionarioExecute(funcTest1, sessaoTest1)

        const func2 = await funcionariosService.createFuncionarioExecute(funcTest2, sessaoTest2)

        await expect(funcionariosService.updateFuncionarioExecute({
            ...func2,
            cpf: func1.cpf
        })).rejects.toBeInstanceOf(AppError)
    })

    test('should update a funcionario with an invalid id', async () => {
        const func = await funcionariosService.createFuncionarioExecute(funcTest1, sessaoTest1)

        await expect(funcionariosService.updateFuncionarioExecute({
            ...func,
            id: 'invalid-id'
        })).rejects.toBeInstanceOf(AppError)
    })

    test('should soft delete a funcionario successfully', async () => {
        const func = await funcionariosService.createFuncionarioExecute(funcTest1, sessaoTest1)

        const funcDeleted = await funcionariosService.deleteFuncionarioExecute(func.id)

        expect(funcDeleted).toEqual({ ...func, status_func: 0 })
    })

    test('should soft delete a funcionario in an invalid id', async () => {
        await expect(funcionariosService.deleteFuncionarioExecute('invalid-id')).rejects.toBeInstanceOf(AppError)
    })

    test('should soft delete a funcionario that is already deleted', async () => {
        const func = await funcionariosService.createFuncionarioExecute(funcTest1, sessaoTest1)

        const funcDeleted = await funcionariosService.deleteFuncionarioExecute(func.id)

        await expect(funcionariosService.deleteFuncionarioExecute(funcDeleted.id)).rejects.toBeInstanceOf(AppError)
    })

    test('should get all funcionarios', async () => {
        const funcionarios = await funcionariosService.getAllFuncionariosExecute()

        expect(funcionarios).toEqual([
            { id: '123', nome: 'first', sobrenome: 'func', cargo: 'GERENTE', cpf: '12345678910', status_func: 1 },
            { id: '321', nome: 'second', sobrenome: 'func', cargo: 'FUNCIONARIO', cpf: '12345678911', status_func: 1 }
        ])
    })
})