import { APP_FILTER } from '@nestjs/core'
import { Module } from '@nestjs/common'

import { HealthCheckController } from '@/core/healthcheck.controller'

import { HttpExceptionFilter } from '@/core/filters/http-exception.filter'
import { AllExceptionsFilter } from '@/core/filters/all-exceptions.filter'

import { DatabaseModule } from './common/database/database.module'
import { AccountsModule } from './modules/accounts/accounts.module'

@Module({
  imports: [DatabaseModule, AccountsModule],
  controllers: [HealthCheckController],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
