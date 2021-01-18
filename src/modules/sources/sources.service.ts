import { ServiceHelper } from '@/common/helpers/service.helper'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'

import { CreateSourceDto } from './dto/create-source.dto'
import { UpdateSourceDto } from './dto/update-source.dto'
import { Source } from './entities/source.entity'

@Injectable()
export class SourcesService extends ServiceHelper<Source> {
  constructor(@InjectRepository(Source) sourceRepository: Repository<Source>) {
    super(sourceRepository)
  }

  create(createAccountDto: CreateSourceDto) {
    return super.create(createAccountDto)
  }

  findAll(options?: FindManyOptions<Source>) {
    return super.findAll(options)
  }

  findOne(id: string, options?: FindOneOptions<Source>) {
    return super.findOne(id, options)
  }

  update(id: string, updateAccountDto: UpdateSourceDto) {
    return super.update(id, updateAccountDto)
  }

  delete(id: string) {
    return super.delete(id)
  }
}
