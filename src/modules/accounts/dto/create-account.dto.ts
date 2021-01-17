import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateAccountDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  @MinLength(3, { message: '用户名最小长度: 3' })
  username: string

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  @MinLength(8, { message: '密码最小长度: 8' })
  password: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
