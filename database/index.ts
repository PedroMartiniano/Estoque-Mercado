import knex, { Knex } from "knex";

const knexConfig: Knex.Config = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1', // localhost
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'mercado'
    }
}

const knexInstance = knex(knexConfig)

export default knexInstance