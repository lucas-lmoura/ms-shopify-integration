import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entity/Users.entity'
import { HashLib } from 'src/providers/hashlib.provider'
import { UsersService } from './users.service'
import { WebTokensLib } from 'src/providers/tokens.provider'
import { UserTransformer } from './transformer/user.transformer'
import { UsersController } from './users.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [HashLib, UsersService, WebTokensLib, UserTransformer],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
