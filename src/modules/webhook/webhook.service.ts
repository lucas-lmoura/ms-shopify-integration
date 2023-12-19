import { Injectable } from '@nestjs/common'
import { CustomersService } from '../customers/customers.service'
import { CustomerDTO } from '../customers/dto/customer.dto'
import { Repository } from 'typeorm'
import { Shippings } from '../shippings/entities/shipping.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ShippingsService } from '../shippings/shippings.service'
import { ProductsService } from '../products/products.service'
import { DeliveryService } from '../delivery/delivery.service'
import { ShopifyService } from '../shopify/shopify.service'

@Injectable()
export class WebhookService {
  constructor(
    private readonly customerService: CustomersService,
    @InjectRepository(Shippings)
    private readonly shipingRepository: Repository<Shippings>,
    private readonly shippingService: ShippingsService,
    private readonly productsService: ProductsService,
    private readonly routeService: DeliveryService,
    private readonly shopifyService: ShopifyService
  ) {}

  async processHook(body: any) {
    if (body.confirmed && body.financial_status.toUpperCase() === 'PAID') {
      let user
      const { customer } = body

      const userExists = await this.customerService.search({ email: customer.email })
      if (!userExists[0]) {
        const customerToDTO = {
          first_name: customer.first_name,
          last_name: customer.last_name,
          email: customer.email,
          phone: customer.phone,
          shopifyId: customer.id,
          createdDate: customer.created_at
        } as CustomerDTO
        user = await this.customerService.create(customerToDTO)
      } else user = userExists[0]

      const { shipping_address } = body

      // simulação de interação API dos correios
      const trackCode = await this.shippingService.generateTrackingCode()

      const dto = {
        title: `Compra aprovada`,
        originCountry: shipping_address.province_code,
        trackingCode: trackCode,
        updateEvery: 1,
        orderId: body.id
      }

      const newOrder = new Shippings()
      newOrder.fillValues(dto)
      newOrder.customer = user
      const shipping = await this.shipingRepository.save(newOrder)

      const { line_items } = body

      await Promise.all(
        line_items.map(async (product) => {
          const route = await this.routeService.fingByTag(product.sku)
          const track = await this.shippingService.generateTrackingCode()
          const saved = await this.productsService.create(
            product,
            track,
            shipping,
            route?.id ?? null
          )

          await this.shopifyService.notifyShopify(body.id, saved.trackingCode)
        })
      )
    }
    return
  }
}
