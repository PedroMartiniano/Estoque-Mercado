import multer from 'fastify-multer'

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/images/products')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})