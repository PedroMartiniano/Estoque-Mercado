import { describe, test, expect, beforeEach } from 'vitest'
import { InMemoryCategoriasRepository } from '../repositories/inMemory/CategoriasRepository'
import { CategoriasService } from '../services/CategoriasService'
import { AppError } from '../error/AppError'

describe('Should test all categorias service components', () => {
    let inMemoryCategoriasRepository: InMemoryCategoriasRepository
    let categoriasService: CategoriasService

    beforeEach(() => {
        inMemoryCategoriasRepository = new InMemoryCategoriasRepository
        categoriasService = new CategoriasService(inMemoryCategoriasRepository)
    })

    test('should create a categoria successfully', async () => {
        const categorias = await categoriasService.createCategoriaExecute('verduras')

        expect(categorias.id).toEqual('0')
    })

    test('should try create a new categoria with an existing name', async () => {
        const categoria = await categoriasService.createCategoriaExecute('verduras')

        await expect(
            categoriasService.createCategoriaExecute(categoria.nome)
        ).rejects.toBeInstanceOf(AppError)
    })

    test('should get a categoria by id successfully', async () => {
        const categoria = await categoriasService.createCategoriaExecute('verduras')

        const getCategoria = await categoriasService.getCategoriaByIdExecute(categoria.id)

        expect(getCategoria).toEqual(categoria)
    })

    test('should try get a categoria with an invalid id', async () => {
        await expect(
            categoriasService.getCategoriaByIdExecute('invalid-id')
        ).rejects.toBeInstanceOf(AppError)
    })

    test('should get all categorias successfully', async () => {
        const categorias = await categoriasService.getAllCategoriasExecute()

        expect(categorias).toEqual([{ id: '123', nome: 'limpeza' }, { id: '321', nome: 'frios' }])
    })
})