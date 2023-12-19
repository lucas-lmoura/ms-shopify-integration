import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { WebTokensLib } from 'src/providers/tokens.provider'

@Injectable()
export class EnsureUserAuthGuard implements CanActivate {
  private tokenService: WebTokensLib
  constructor(private readonly reflector: Reflector) {
    this.tokenService = new WebTokensLib()
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())
    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers
    if (!authorization) throw new HttpException('Nao autorizado', HttpStatus.UNAUTHORIZED)

    try {
      if (await this.tokenService.verifyToken(authorization)) return true
    } catch (error) {
      throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED)
    }
    throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED)
  }
}
