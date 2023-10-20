import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
    SECRET_JWT: z.string(),
    OPENAI_API_KEY: z.string(),
    DATABASE_PASSWORD: z.string()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error(_env.error)
    process.exit(1)
}

export const env = _env.data