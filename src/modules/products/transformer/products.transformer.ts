import { Transformer } from "src/common/transformer";
import { Products } from "../entities/products.entity";

export class ProductsTransformer extends Transformer {
  async transform ( item: Products ) {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      code: item.trackingCode,
      status: item.status,
      route: item.status['id']
    }
  }
}
