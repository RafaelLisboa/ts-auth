import 'dotenv/config';

import { DataSource } from 'typeorm';

import Role from './domain/Role';
import RoleType from './domain/RoleType';
import User from './domain/User';

const port = process.env.DB_PORT as unknown as number | undefined;


const appDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [
        User,
        Role,
        RoleType,
    ],
    migrations: [
        "./src/migrations"
    ]
})

export default appDataSource;