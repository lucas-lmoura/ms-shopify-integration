import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsUUID,
  Matches
} from 'class-validator'

export class UserDTO {
  @IsOptional()
  @IsUUID('4')
  id: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @Matches(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/))
  password: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean
}
