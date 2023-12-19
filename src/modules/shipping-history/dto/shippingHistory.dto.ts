import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { States } from 'src/modules/addresses/enums/states.enum'
import { ShippingsDTO } from 'src/modules/shippings/dto/shippings.dto'

export class ShippingHistoryDTO {

  @IsString()
  @IsOptional()
  id: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsEnum(States)
  state: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsDate()
  @IsNotEmpty()
  date: Date

  @IsString()
  @IsNotEmpty()
  currentRoute: string

  @Type(() => ShippingsDTO)
  shipping: ShippingsDTO
}
