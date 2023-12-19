import { sign, verify } from 'jsonwebtoken'
import appConfig from 'src/config/app.config'

export interface IPayload {
  data: {
    sub: string
  }
}

export class WebTokensLib {
  private expires: string = '1h'

  constructor() {}

  async signToken(payload: IPayload): Promise<{ token: string }> {
    const token = await sign(payload, appConfig().secret, { expiresIn: this.expires })
    return token
  }

  async verifyToken(token: string) {
    return await verify(token, appConfig().secret)
  }
}
