import { APP_FILTER } from '@nestjs/core'
import { MiddlewareConsumer, Module } from '@nestjs/common'

import { HealthCheckController } from '@/core/healthcheck.controller'
import { LoggerMiddleware } from '@/core/middlewares/logger.middleware'
import { HttpExceptionFilter } from '@/core/filters/http-exception.filter'
import { AllExceptionsFilter } from '@/core/filters/all-exceptions.filter'

import { DatabaseModule } from '@/common/database/database.module'
import { RedisModule } from '@/common/redis/redis.module'
import { LoggerModule } from '@/common/logger/logger.module'
import { SocketModule } from '@/common/socket/socket.module'

import { AccountsModule } from '@/modules/accounts/accounts.module'

@Module({
  imports: [LoggerModule, DatabaseModule, SocketModule, RedisModule, AccountsModule],
  controllers: [HealthCheckController],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
