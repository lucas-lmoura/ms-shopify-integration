import { ShippingHistory } from '../entities/shippingHistory.entity'
import { Transformer } from 'src/common/transformer'

export class ShippingHistoryTransformer extends Transformer {
  public async collection(histories: ShippingHistory[]) {
    const transformed = []
    for (const history of histories) {
      transformed.push(await this.transform(history))
    }
    return transformed
  }

  public async transform(history: ShippingHistory) {
    return {
      id: history.id,
      description: history.description,
      date: history.date,
      currentRoute: `${history.city}/${history.state}`
    }
  }
}
