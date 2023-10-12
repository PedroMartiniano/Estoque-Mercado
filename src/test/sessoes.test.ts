import { describe, test, expect, beforeEach } from 'vitest'
import { InMemorySessoesRepository } from '../repositories/inMemory/SessoesRepository'
import { SessoesService } from '../services/SessoesService'
import { CreateSessaoProps } from '../@types/Sessoes'
import { AppError } from '../error/AppError'

describe('should test all sessoes service components', async () => {
    let inMemorySessoesRepository: InMemorySessoesRepository
    let sessoesService: SessoesService
    let sessaoSuccess: CreateSessaoProps = {
        email: 'cliente@teste.com',
        senha: '123456'
    }
    let sessaoFailEmail: CreateSessaoProps = {
        email: 'invalid@gmail.com',
        senha: '123456'
    }
    let sessaoFailSenha: CreateSessaoProps = {
        email: 'cliente@teste.com',
        senha: '1234567'
    }

    beforeEach(async () => {
        inMemorySessoesRepository = new InMemorySessoesRepository
        sessoesService = new SessoesService(inMemorySessoesRepository)

        await inMemorySessoesRepository.createHashPassword()
    })

    test('should get a sessao by email successfully', async () => {
        const sessao = await sessoesService.getSessaoByEmailExecute(sessaoSuccess.email)

        expect(sessao).toBeTruthy()
    })

    test('should try get a sessao by an invalid email', async () => {
        await expect(
            sessoesService.getSessaoByEmailExecute(sessaoFailEmail.email)
        ).rejects.toBeInstanceOf(AppError)
    })

    test('should do the authentication successfully', async () => {
        const auth = await sessoesService.authUserExecute(sessaoSuccess)

        expect(auth.id_cliente).toBeTypeOf('string')
    })

    test('should fail on the email authentication', async () => {
        await expect(
            sessoesService.authUserExecute(sessaoFailEmail)
        ).rejects.toBeInstanceOf(AppError)
    })

    test('should fail on the password authentication', async () => {
        await expect(
            sessoesService.authUserExecute(sessaoFailSenha)
        ).rejects.toBeInstanceOf(AppError)
    })

    test('should try to do the authetication with a deactivated sessao', async () => {
        inMemorySessoesRepository.deactivateSessao()

        await expect(
            sessoesService.authUserExecute(sessaoSuccess)
        ).rejects.toBeInstanceOf(AppError)
    })
})