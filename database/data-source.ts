import { DataSource } from 'typeorm'
import 'dotenv/config'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ['src/modules/**/*.entity.{ts,js}'],
  migrations: ['database/migrations/*.{ts,js}'],
  migrationsRun: true,
  ssl: true
})
