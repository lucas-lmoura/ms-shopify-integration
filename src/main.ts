import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import appConfig from './config/app.config'
import { ValidationPipe } from '@nestjs/common'

function screenMessage() {
  console.log('[API]---------------------------')
  console.log('[API Name]:', appConfig().name)
  console.log('[API Port]:', appConfig().port)
  console.log('[API env:]', appConfig().node_env)
  console.log('[API]---------------------------')
}

async function bootstrap() {

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()

  await app.listen(appConfig().port)

  screenMessage()
}

bootstrap()
