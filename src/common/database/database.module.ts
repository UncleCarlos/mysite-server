import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { get as getConfig } from 'config'
import { DatabaseService } from './database.service'

const settings: IDBSettings = getConfig('DB_SETTINGS')

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  ...settings,
  database: `${settings.database}_${process.env.NODE_ENV}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  maxQueryExecutionTime: 0.1,
  synchronize: true,
  keepConnectionAlive: false,
  cli: {
    migrationsDir: __dirname + '/migrations/**/*{.ts,.js}',
  },
}

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig)],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
