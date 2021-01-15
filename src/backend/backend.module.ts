import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BackendController } from './backend.controller'

import { UsersService } from '@/services'
import { User } from '@/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [BackendController],
  providers: [UsersService],
})
export class BackendModule {}
