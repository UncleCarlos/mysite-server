import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
