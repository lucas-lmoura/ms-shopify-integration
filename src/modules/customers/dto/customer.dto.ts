import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CustomerDTO {
  @IsString()
  @IsOptional()
  id: string

  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsString()
  @IsNotEmpty()
  last_name: string

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsOptional()
  createdDate: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsOptional()
  shopifyId: string

  @IsString()
  @IsOptional()
  company: string
}
