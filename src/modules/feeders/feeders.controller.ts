import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'

import { FeedersService } from './feeders.service'
import { CreateFeederDto } from './dto/create-feeder.dto'
import { UpdateFeederDto } from './dto/update-feeder.dto'

@Controller('feeders')
export class FeedersController {
  constructor(private readonly feedersService: FeedersService) {}

  @Post()
  create(@Body() createFeederDto: CreateFeederDto) {
    return this.feedersService.create(createFeederDto)
  }

  @Get()
  findAll() {
    return this.feedersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedersService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFeederDto: UpdateFeederDto) {
    return this.feedersService.update(id, updateFeederDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.feedersService.delete(id)
  }
}
