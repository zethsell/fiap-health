import { DataSource } from 'typeorm'
import 'dotenv/config'
import { Migrations1716848242810 } from './migrations'

const ssl = process.env['DB_CERT']
  ? {
      ca: process.env['DB_CERT'] ?? '',
      rejectUnauthorized: false,
    }
  : null

export default new DataSource({
  type: (process.env['DB_TYPE'] as any) ?? 'postgres',
  host: process.env['DB_HOST'],
  schema: process.env['DB_SCHEMA'],
  port: Number.parseInt(process.env['DB_PORT']),
  username: process.env['DB_USER'],
  password: process.env['DB_PASS'],
  database: process.env['DB_NAME'],
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  migrations: [Migrations1716848242810],
  synchronize: false,
  migrationsRun: Boolean(process.env['DB_MIGRATION'] ?? true),
  ssl,
})
