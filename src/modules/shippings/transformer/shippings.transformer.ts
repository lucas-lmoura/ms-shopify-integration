import { Transformer } from 'src/common/transformer'
import { Shippings } from '../entities/shipping.entity'
import { ShippingHistoryTransformer } from 'src/modules/shipping-history/transformer/shippingHistoryTransformer'
import { CustomerTransformer } from 'src/modules/customers/transformer/customer.transformer'
import { ProductsTransformer } from 'src/modules/products/transformer/products.transformer'

export class ShippingTransformer extends Transformer {
  private shippingHistoryTransformer: ShippingHistoryTransformer
  private customerTrasformer: CustomerTransformer
  private productTransfomer: ProductsTransformer
  constructor() {
    super()
    this.shippingHistoryTransformer = new ShippingHistoryTransformer()
    this.customerTrasformer = new CustomerTransformer()
    this.productTransfomer = new ProductsTransformer()
  }

  public async collection(shippings: Shippings[]) {
    const transformed = []
    for (const shipping of shippings) {
      transformed.push(await this.transform(shipping))
    }
    return transformed
  }

  public async transform(shipping: Shippings) {
    return {
      id: shipping.id,
      title: shipping.title,
      customer: shipping.customer ? await this.customerTrasformer.transform(shipping.customer) : {},
      history: await this.shippingHistoryTransformer.collection(shipping.history),
      products: await this.productTransfomer.collection(shipping.products)
    }
  }
}
