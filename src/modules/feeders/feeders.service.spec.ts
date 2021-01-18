import { Test, TestingModule } from '@nestjs/testing'
import { FeedersService } from './feeders.service'

describe('FeedersService', () => {
  let service: FeedersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedersService],
    }).compile()

    service = module.get<FeedersService>(FeedersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
