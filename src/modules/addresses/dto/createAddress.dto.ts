import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { States } from '../enums/states.enum'

export class CreateAddressDTO {
  @IsString()
  @IsNotEmpty()
  street: string

  @IsString()
  @IsNotEmpty()
  number: string

  @IsString()
  @IsOptional()
  complement

  @IsString()
  @IsNotEmpty()
  city: string

  @IsString()
  @IsEnum(States)
  state: string

  @IsOptional()
  @IsString()
  id: string
}
