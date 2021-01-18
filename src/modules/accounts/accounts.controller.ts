import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'

import { ValidationPipe } from '@/core/pipes/validation.pipe'

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createAccountDto: CreateAccountDto) {
    const result = await this.accountsService.create(createAccountDto)
    delete result.password
    return result
  }

  @Get()
  findAll() {
    return this.accountsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.accountsService.delete(id)
  }
}
