import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const port = configService.get('port')
  const cors = configService.get('cors')

  app.enableCors(cors)

  await app.listen(port)
}
bootstrap()
