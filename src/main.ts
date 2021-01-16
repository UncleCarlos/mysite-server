import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { NestFactory } from '@nestjs/core'
import { get as getConfig } from 'config'
// import helmet from 'helmet'
// import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

const appSettings: IAppSettings = getConfig('APP_SETTINGS')
const corsSettings: ICorsSettings = getConfig('CORS_SETTINGS')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const cors: CorsOptions = {
    origin: corsSettings.allowedOrigins,
    methods: corsSettings.allowedMethods,
  }

  // app.useLogger(app.get(Logger))
  // app.use(helmet())
  app.enableCors(cors)

  await app.listen(appSettings.port)
}
bootstrap()
