import { IsString, IsUUID } from "class-validator";

export class UpdateProductDTO {
  @IsString()
  @IsUUID('4')
  route: string

}
