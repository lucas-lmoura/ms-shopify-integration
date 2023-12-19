import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'

export class UserSignInDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @Matches(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/))
  password: string
}
