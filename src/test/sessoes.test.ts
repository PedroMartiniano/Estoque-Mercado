import { describe, test, expect, beforeEach } from 'vitest'
import { InMemorySessoesRepository } from '../repositories/inMemory/SessoesRepository'
import { SessoesService } from '../services/SessoesService'
import { CreateSessaoProps } from '../@types/Sessoes'

describe('should test all sessoes service components', async () => {
    let inMemorySessoesRepository: InMemorySessoesRepository
    let sessoesService: SessoesService
    let sessaoTest1: CreateSessaoProps = {
        email: 'email@teste.com',
        senha: '123456'
    }

    beforeEach(() => {
        inMemorySessoesRepository = new InMemorySessoesRepository
        sessoesService = new SessoesService(inMemorySessoesRepository)
    })


    test('should get a sessao by email successfully', async () => {
        const sessao = await sessoesService.getSessaoByEmailExecute('teste@gmail.com')
    })
})