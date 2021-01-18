import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { SourcesService } from './sources.service'
import { CreateSourceDto } from './dto/create-source.dto'
import { UpdateSourceDto } from './dto/update-source.dto'

@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @Post()
  create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourcesService.create(createSourceDto)
  }

  @Get()
  findAll() {
    return this.sourcesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sourcesService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSourceDto: UpdateSourceDto) {
    return this.sourcesService.update(id, updateSourceDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.sourcesService.delete(id)
  }
}
