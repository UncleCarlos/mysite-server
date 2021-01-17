import { Injectable } from '@nestjs/common'
import { ServiceHelper } from '@/common/helpers/service.helper'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'

import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'

import { Account } from './entities/account.entity'

@Injectable()
export class AccountsService extends ServiceHelper<Account> {
  constructor(@InjectRepository(Account) accountRepository: Repository<Account>) {
    super(accountRepository)
  }
  create(createAccountDto: CreateAccountDto) {
    return super.create(createAccountDto)
  }

  findAll(options?: FindManyOptions<Account>) {
    return super.findAll(options)
  }

  findOne(id: number, options?: FindOneOptions<Account>) {
    return super.findOne(id, options)
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return super.update(id, updateAccountDto)
  }

  delete(id: number) {
    return super.delete(id)
  }
}
