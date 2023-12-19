import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entity/Users.entity'
import { Repository } from 'typeorm'
import { HashLib } from 'src/providers/hashlib.provider'
import { UserSignInDTO } from './dto/user-signIn.dto'
import { WebTokensLib } from 'src/providers/tokens.provider'
import { UserDTO } from './dto/UserDTO'

@Injectable()
export class UsersService {
  private hashLibService: HashLib
  private webTokenService: WebTokensLib

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    this.hashLibService = new HashLib()
    this.webTokenService = new WebTokensLib()
  }

  async signIn(userDTO: UserSignInDTO) {
    const user = await this.userRepository.findOne({ where: { email: userDTO.email } })
    if (!user) return { message: 'Usuário ou senha inválidos' }
    if (await this.hashLibService.compare(userDTO.password, user.password)) {
      const token = await this.webTokenService.signToken({ data: { sub: user.id } })
      return {
        user,
        token
      }
    } else {
      return { message: 'Usuário ou senha inválidos' }
    }
  }

  async createUser(userDTO: UserDTO): Promise<User> {
    const user = new User()
    user.fillValues(userDTO)
    user.password = await this.hashLibService.hashPassword(userDTO.password)
    user.sysAdmin = false
    return await this.userRepository.save(user)
  }

  async listUsers(take: number = 10, skip: number = 0): Promise<{ count: number; users: User[] }> {
    const users = await this.userRepository.findAndCount({ take, skip, where: { sysAdmin: false } })
    return {
      count: users[1],
      users: users[0]
    }
  }
}
