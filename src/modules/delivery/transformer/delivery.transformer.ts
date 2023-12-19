import { Transformer } from "src/common/transformer";
import { Delivery } from "../entities/delivery.entity";

export class DeliveryTransformer extends Transformer {
  
  async transform(item: Delivery) {
    return {
      id: item.id,
      title: item.title,
      originProvince: item.originProvince,
      cicle: item.cicle,
      tag: item.tag,
      interval: item.interval,
      defaults: item.defaults
    }
  }
}
