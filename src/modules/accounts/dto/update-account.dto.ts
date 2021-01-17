// import { PartialType } from '@nestjs/mapped-types'
import { CreateAccountDto } from './create-account.dto'

// export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
export class UpdateAccountDto extends CreateAccountDto {}
