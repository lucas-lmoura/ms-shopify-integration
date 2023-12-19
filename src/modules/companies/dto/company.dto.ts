import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { CreateAddressDTO } from 'src/modules/addresses/dto/createAddress.dto'

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsOptional()
  phone: string

  @IsString()
  @IsNotEmpty()
  cnpj: string

  @Type(() => CreateAddressDTO)
  address: CreateAddressDTO
}
