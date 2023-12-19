import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { States } from 'src/modules/addresses/enums/states.enum'
import { ShippingHistoryDTO } from 'src/modules/shipping-history/dto/shippingHistory.dto'

export class ShippingsDTO {

  @IsString()
  @IsOptional()
  id: string

  @IsString()
  @IsOptional()
  orderId: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  originCountry: string

  @IsNumber()
  @IsNotEmpty()
  updateEvery: number

  @IsString()
  @IsUUID('4')
  @IsNotEmpty()
  customer: string

  @Type(() => ShippingHistoryDTO)
  history: ShippingHistoryDTO[]
}
