import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { Request } from 'express'

import { User } from '@/interface/user.interface'
import { UsersService } from '@/services'
import { CreateUserDto } from '@/services/users/dto/create-user.dto'

import { ValidationPipe } from '@/validation.pipe'

@Controller('backend')
export class BackendController {
  constructor(private usersService: UsersService) {}

  @Get('user')
  async getUsers(@Req() request: Request): Promise<User[]> {
    const result = await this.usersService.findAll()
    return result
  }

  @Post('user')
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<User> {
    const result = await this.usersService.create(createUserDto)
    delete result.password
    return result
  }
}
