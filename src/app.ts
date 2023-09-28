import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { errorHandler } from "./error/errorHandler";
import multer from "fastify-multer";
import { storage } from "./multer";
import { routes } from "./routes";

const app = fastify()

app.register(cors)

app.register(multer.contentParser)

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const types = ['svg', 'jpg', 'png', 'gif']

        let [, filename] = file.mimetype.split('/')

        const isTypeValid = types.includes(filename)

        return (isTypeValid) ? cb(null, true) : cb(null, false)
    }
})

app.register(fastifyJwt, {
    secret: env.SECRET_JWT,
    sign: {
        expiresIn: '1d'
    }
})

app.register(routes)

app.setErrorHandler(errorHandler)

export default app