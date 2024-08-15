import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'
import { join } from "path"

export const AppDataSource = new DataSource({
    type:"mysql",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize:true,
    logging: true,
    entities: [join(__dirname, '**/*.entity.{js,ts}')],
    migrations:["./src/migration/*.ts"],
    subscribers:[],
})