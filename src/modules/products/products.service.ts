import { Injectable } from '@nestjs/common'
import { productsDTO } from './dto/produts.dto'
import { Products } from './entities/products.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Shippings } from '../shippings/entities/shipping.entity'
import { DeliveryService } from '../delivery/delivery.service'
import { MapsProvider } from 'src/providers/mapsProvider'
import { UpdateProductDTO } from './dto/update.dto'
import moment from 'moment'
import * as EmailValidator from 'email-validator'
import { CustomersService } from '../customers/customers.service'
import { ShippingsService } from '../shippings/shippings.service'

@Injectable()
export class ProductsService {
  private finalHistory: string[] = [
    'Objeto saiu para entrega ao destinatário',
    'Tentativa de entrega ao destinatário sem sucesso',
    'Objeto saiu para entrega ao destinatário 2ª tentativa',
    'Tentativa de entrega ao destinatário sem sucesso',
    'Objeto saiu para entrega ao destinatário 3ª tentativa',
    'Tentativa de entrega ao destinatário sem sucesso',
    'Objeto retornado ao remetente'
  ]
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    private readonly deliveryService: DeliveryService,
    private readonly mapService: MapsProvider = new MapsProvider(),
    private readonly customerService: CustomersService,
    private readonly shippingService: ShippingsService
  ) {}

  async create(
    productDTO: productsDTO,
    trackingCode: string,
    shipping: Shippings,
    routeId?: string
  ) {
    const product = new Products()
    product.fillValues(productDTO)
    product.trackingCode = trackingCode
    product.shipping = shipping
    product.lineItemId = productDTO.id
    product.name = productDTO.title
    product.status = {
      id: routeId,
      productRoute: {
        description: 'Pedido recebido.',
        date: '2023-10-14T22:05:06.387Z'
      }
    }
    return await this.productRepository.save(product)
  }

  async update(id: string, data: UpdateProductDTO) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { shipping: true }
    })
    const customRoute = await this.deliveryService.findOne(data.route)
    const productRoute = []

    productRoute.push({
      province: customRoute.originProvince + '/Brasil',
      description: 'Objeto recebido',
      date: moment().toDate()
    })

    for (const route of customRoute.defaults) {
      productRoute.push({
        province: customRoute.originProvince + '/Brasil',
        description: route,
        date: productRoute[productRoute.length - 1]?.date
          ? moment(productRoute[productRoute.length - 1].date)
              .add(customRoute.interval, 'days')
              .toDate()
          : moment().add(customRoute.interval, 'days').toDate()
      })
    }

    const route = new Set(
      await this.mapService.createRoute(customRoute.originProvince, product.shipping.originCountry)
    )

    for (const item of route) {
      const lastDate = productRoute[productRoute.length - 1].date
      if (item !== customRoute.originProvince)
        productRoute.push({
          province: item + '/Brasil',
          description: 'Objeto recebido',
          date: moment(lastDate).add(customRoute.interval, 'days')
        })
    }

    for (const lastRoute of this.finalHistory) {
      const lastDate = moment(productRoute[productRoute.length - 1].date).add(
        customRoute.interval,
        'days'
      )
      if (lastDate.isBefore(moment(product.shipping.creationDate).add(customRoute.cicle)))
        lastDate.add(3, 'days')

      if (lastDate.weekday() === 6) lastDate.add(2, 'days')
      else if (lastDate.weekday() === 1) lastDate.add(1, 'day')

      productRoute.push({
        province: product.shipping.originCountry + '/Brasil',
        description: lastRoute,
        date: lastDate.toDate()
      })
    }
    product.status = { id: data.route, productRoute }
    await product.save()

    return productRoute
  }

  async track(trackingCode: string) {
    console.log(trackingCode, EmailValidator.validate(trackingCode))
    if (EmailValidator.validate(trackingCode)) {
      const shippings = await this.shippingService.recover(trackingCode)
      const data = {
        count: shippings[1],
        customer: `${shippings[0][0].customer.first_name} ${shippings[0][0].customer.last_name}`,
        codes: []
      }

      console.log(shippings[0][0].products[0].trackingCode)
      for (const item of shippings[0]) {
        data.codes.push(item.products.map((prod) => prod.trackingCode))
      }
      return data
    } else {
      const product = await this.productRepository.findOne({
        where: { trackingCode },
        relations: { shipping: true }
      })
      return {
        customer: `${product.shipping.customer.first_name} ${product.shipping.customer.last_name}`,
        status:
          (await product.status.productRoute.length) > 1
            ? product.status.productRoute.filter((route) => {
                return moment(route.date).isBefore(moment().toDate())
              })
            : product.status.productRoute
      }
    }
  }

  async dailyChecking(page: number = 0) {
    return await this.productRepository.find({
      take: 10,
      skip: page,
      relations: { shipping: true }
    })
  }

  async countProducts() {
    return await this.productRepository.count()
  }
}
