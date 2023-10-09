import { describe, test, expect, beforeEach } from "vitest";
import { ClientesService } from "../services/ClientesService";
import { InMemoryClientesRepository } from "../repositories/inMemory/ClientesRepository";
import { CreateClienteProps } from "../@types/Clientes";
import { CreateSessaoProps } from "../@types/Sessoes";
import { AppError } from "../error/AppError";

describe('should test all clientes service components', () => {
    let inMemoryClientesRepository: InMemoryClientesRepository
    let clientesService: ClientesService
    let clienteTest1: CreateClienteProps = {
        nome: 'first',
        sobrenome: 'cliente',
        cpf: '12345678910',

    }
    let clienteTest2: CreateClienteProps = {
        nome: 'second',
        sobrenome: 'cliente',
        cpf: '12345678911'
    }
    let sessaoTest1: CreateSessaoProps = {
        email: 'cliente@teste.com',
        senha: '123456'
    }
    let sessaoTest2: CreateSessaoProps = {
        email: 'cliente2@teste.com',
        senha: '123456'
    }

    beforeEach(() => {
        inMemoryClientesRepository = new InMemoryClientesRepository
        clientesService = new ClientesService(inMemoryClientesRepository)
    })

    test('should create a cliente successfully', async () => {
        const cliente = await clientesService.createClientesExecute(clienteTest1, sessaoTest1)

        expect(cliente.id).toEqual('0')
    })

    test('should create a cliente with an existing cpf', async () => {
        const cliente1 = await clientesService.createClientesExecute(clienteTest1, sessaoTest1)

        await expect(clientesService.createClientesExecute({
            ...clienteTest2,
            cpf: cliente1.cpf
        },
            sessaoTest2
        )).rejects.toBeInstanceOf(AppError)
    })

    test('should get a client by his id successfully', async () => {
        const cliente = await clientesService.createClientesExecute(clienteTest1, sessaoTest1)

        const getClient = await clientesService.getClienteByIdExecute(cliente.id)

        expect(getClient).toEqual(cliente)
    })

    test('should try get a client with an invalid id', async () => {
        await expect(clientesService.getClienteByIdExecute('invalid-id')).rejects.toBeInstanceOf(AppError)
    })

    test('should update a funcionario successfully', async () => {
        const cliente = await clientesService.createClientesExecute(clienteTest1, sessaoTest1)

        const updateCliente = await clientesService.updateClienteExecute({ id: cliente.id, nome: 'updated', sobrenome: 'cliente', cpf: '12345678911', status_cliente: 1 })

        expect(updateCliente).toEqual({ id: updateCliente.id, nome: 'updated', sobrenome: 'cliente', cpf: '12345678911', status_cliente: 1 })
    })

    test('should try update a cliente with an invalid id', async () => {
        const cliente = await clientesService.createClientesExecute(clienteTest1, sessaoTest1)

        await expect(clientesService.updateClienteExecute({ ...cliente, id: 'invalid-id' })).rejects.toBeInstanceOf(AppError)
    })

    test('should try update a ciente with a using cpf', async () => {
        const cliente1 = await clientesService.createClientesExecute(clienteTest1, sessaoTest1)

        const cliente2 = await clientesService.createClientesExecute(clienteTest2, sessaoTest2)

        await expect(clientesService.updateClienteExecute({
            ...cliente2,
            cpf: cliente1.cpf
        })).rejects.toBeInstanceOf(AppError)
    })

    test('should soft delete a cliente successfully', async () => {
        const cliente = await clientesService.createClientesExecute(clienteTest1, sessaoTest1)

        const clienteDeleted = await clientesService.deleteClienteExecute(cliente.id)

        expect(clienteDeleted).toEqual({ ...cliente, status_cliente: 0 })
    })

    test('should try delete a cliente with an invalid id', async () => {
        await expect(clientesService.deleteClienteExecute('invalid-id')).rejects.toBeInstanceOf(AppError)
    })

    test('should try delete a cliente that is already deleted', async () => {
        const cliente = await clientesService.createClientesExecute(clienteTest1, sessaoTest1)

        const clienteDeleted = await clientesService.deleteClienteExecute(cliente.id)

        await expect(clientesService.deleteClienteExecute(clienteDeleted.id)).rejects.toBeInstanceOf(AppError)
    })

    test('should get all clientes successfully', async () => {
        const clientes = await clientesService.getAllClientesExecute()

        expect(clientes).toEqual([
            { id: '123', nome: 'first', sobrenome: 'cliente', cpf: '12345678910', status_cliente: 1 },
            { id: '321', nome: 'second', sobrenome: 'cliente', cpf: '12345678911', status_cliente: 1 }
        ])
    })
})