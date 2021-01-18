import { Test, TestingModule } from '@nestjs/testing'
import { FeedersController } from './feeders.controller'
import { FeedersService } from './feeders.service'

describe('FeedersController', () => {
  let controller: FeedersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedersController],
      providers: [FeedersService],
    }).compile()

    controller = module.get<FeedersController>(FeedersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
