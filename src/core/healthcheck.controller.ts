import { Controller, Get } from '@nestjs/common'

@Controller()
export class HealthCheckController {
  @Get()
  public async sayHello() {
    return { message: 'Business as usual.' }
  }
}
