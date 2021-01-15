import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import configuration from '@/config/env.dev'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'

import { BackendModule } from '@/backend/backend.module'
import { ClientModule } from '@/client/client.module'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        autoLoadEntities: true,
        ...configService.get('postgres'),
      }),
    }),
    BackendModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
