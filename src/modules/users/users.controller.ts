import {
  Body,
  Controller,
  DefaultValuePipe,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res
} from '@nestjs/common'
import { UserTransformer } from './transformer/user.transformer'
import { UsersService } from './users.service'
import { UserSignInDTO } from './dto/user-signIn.dto'
import { Public } from 'src/decorators/publicRoutes'
import { UserDTO } from './dto/UserDTO'

@Controller('users')
export class UsersController {
  constructor(
    private userTransformer: UserTransformer,
    private userService: UsersService
  ) {}

  @Public()
  @Post('/sign-in')
  async signIn(@Req() request, @Res() response, @Body() userSignInDTO: UserSignInDTO) {
    const result = await this.userService.signIn(userSignInDTO)
    const { user, token } = result
    if (user)
      return response.status(HttpStatus.OK).json({
        user: await this.userTransformer.transform(user),
        token
      })
    return response.status(HttpStatus.BAD_REQUEST).json(result)
  }

  @Post()
  async addUser(@Req() request, @Res() response, @Body() userDTO: UserDTO) {
    try {
      const user = await this.userService.createUser(userDTO)
      return response.status(HttpStatus.CREATED).json(await this.userTransformer.transform(user))
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }
  }

}
