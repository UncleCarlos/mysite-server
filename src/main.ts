import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { get as getConfig } from 'config'

import { Redis } from 'ioredis'
import { REDIS_PUBLISHER_CLIENT, REDIS_SUBSCRIBER_CLIENT } from '@/common/redis/redis.constants'
import { CustomRedisIoAdapter } from '@/common/socket/socket.adapter'
// import helmet from 'helmet'
// import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

const appSettings: IAppSettings = getConfig('APP_SETTINGS')
const corsSettings: ICorsSettings = getConfig('CORS_SETTINGS')
const redisSettings: IRedisSettings = getConfig('REDIS_SETTINGS')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const cors: CorsOptions = {
    origin: corsSettings.allowedOrigins,
    methods: corsSettings.allowedMethods,
  }

  // app.useLogger(app.get(Logger))
  // app.use(helmet())
  app.enableCors(cors)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )

  if (redisSettings.use) {
    const pubClient: Redis = app.get(REDIS_PUBLISHER_CLIENT)
    const subClient: Redis = app.get(REDIS_SUBSCRIBER_CLIENT)

    app.useWebSocketAdapter(new CustomRedisIoAdapter(app, subClient, pubClient))
  } else {
    app.useWebSocketAdapter(new IoAdapter(app))
  }

  await app.listen(appSettings.port)
}
bootstrap()
