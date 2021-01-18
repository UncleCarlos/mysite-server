import { APP_FILTER } from '@nestjs/core'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
// 核心
import { LoggerMiddleware } from '@/core/middlewares/logger.middleware'
import { HttpExceptionFilter } from '@/core/filters/http-exception.filter'
// import { AllExceptionsFilter } from '@/core/filters/all-exceptions.filter'
// 通用模块
import { DatabaseModule } from '@/common/database/database.module'
import { RedisModule } from '@/common/redis/redis.module'
import { LoggerModule } from '@/common/logger/logger.module'
import { SocketModule } from '@/common/socket/socket.module'
import { CollectorModule } from '@/common/schedule/collector/collector.module'
// 模块
import { AccountsModule } from '@/modules/accounts/accounts.module'
import { SourcesModule } from '@/modules/sources/sources.module'
import { FeedersModule } from '@/modules/feeders/feeders.module'

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    RedisModule,
    SocketModule,
    ScheduleModule.forRoot(),
    AccountsModule,
    SourcesModule,
    CollectorModule,
    FeedersModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    // { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
