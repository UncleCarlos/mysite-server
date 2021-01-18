import { HttpModule, Module } from '@nestjs/common'

import { LoggerService } from '@/common/logger/logger.service'
import { RedisModule } from '@/common/redis/redis.module'

import { CollectorService } from './collector.service'

@Module({
  imports: [
    RedisModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 50000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [
    {
      provide: LoggerService,
      useValue: new LoggerService(CollectorModule.name),
    },
    CollectorService,
  ],
})
export class CollectorModule {}
