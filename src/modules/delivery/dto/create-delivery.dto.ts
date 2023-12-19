import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  originProvince: string

  @IsNumber()
  @IsNotEmpty()
  interval: number

  @IsString()
  @IsOptional()
  tag: string

  @IsOptional()
  defaults: any
}
