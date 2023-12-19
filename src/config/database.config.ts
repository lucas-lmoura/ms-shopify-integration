import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import path from 'path'

const { env } = process

export default (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: env.DB_HOST,
    port: +env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
    synchronize: false,
    ssl: true
    
  }
}
