import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm'

import { ServiceHelper } from '@/common/helpers/service.helper'

import { CreateFeederDto } from './dto/create-feeder.dto'
import { UpdateFeederDto } from './dto/update-feeder.dto'
import { Feeder } from './entities/feeder.entity'

@Injectable()
export class FeedersService extends ServiceHelper<Feeder> {
  constructor(@InjectRepository(Feeder) feederRepository: Repository<Feeder>) {
    super(feederRepository)
  }
  create(createAccountDto: CreateFeederDto) {
    return super.create(createAccountDto)
  }

  findAll(options?: FindManyOptions<Feeder>) {
    return super.findAll(options)
  }

  findOne(id: string, options?: FindOneOptions<Feeder>) {
    return super.findOne(id, options)
  }

  update(id: string, updateAccountDto: UpdateFeederDto) {
    return super.update(id, updateAccountDto)
  }

  delete(id: string) {
    return super.delete(id)
  }
}
