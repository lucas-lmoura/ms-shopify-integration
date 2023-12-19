import { IsOptional, IsString } from 'class-validator'

export class productsDTO {
  @IsString()
  title: string

  @IsString()
  price: string

  @IsString()
  quantity: string

  @IsString()
  @IsOptional()
  trakingCode: string

  @IsOptional()
  status: any

  @IsOptional()
  id: number
}
