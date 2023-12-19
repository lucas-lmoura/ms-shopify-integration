import { Transformer } from 'src/common/transformer'
import { User } from '../entity/Users.entity'

export class UserTransformer extends Transformer {
  private user: User

  constructor() {
    super()
  }

  public async transform(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}
