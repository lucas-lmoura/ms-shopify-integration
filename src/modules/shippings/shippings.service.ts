import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Shippings } from './entities/shipping.entity'
import { Repository } from 'typeorm'
import { ShippingsDTO } from './dto/shippings.dto'
import { CustomersService } from '../customers/customers.service'
import { ShippingHistoryService } from '../shipping-history/shipping-history.service'
import * as EmailValidator from 'email-validator'
import { HttpClient } from 'src/common/http.client'

@Injectable()
export class ShippingsService {
  constructor(
    @InjectRepository(Shippings)
    private readonly shippingRepository: Repository<Shippings>,
    private readonly shippingHistoryService: ShippingHistoryService,
    private readonly customerService: CustomersService,
    private httpClient: HttpClient = new HttpClient({
      baseURL: process.env.SHOPIFY_URL,
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_SECRET
      }
    })
  ) {}

  async create(shippingDTO: ShippingsDTO): Promise<Shippings> {
    let shipping
    if (!shippingDTO.id) {
      shipping = new Shippings()
    } else {
      shipping = await this.shippingRepository.findOne({ where: { id: shippingDTO.id } })
    }
    shipping.fillValues(shippingDTO)

    const customer = await this.customerService.findOne(shippingDTO.customer)

    shipping.customer = customer
    shipping.trackingCode = await this.generateTrackingCode()

    await this.shippingRepository.save(shipping)

    const history = await this.shippingHistoryService.create(shippingDTO.history, shipping)
    shipping.history = history

    return shipping
  }

  async list(
    take: number = 10,
    skip: number = 0
  ): Promise<{ count: number; shippings: Shippings[] }> {
    if (skip > 0) {
      skip = (skip - 1) * take
    }

    const shippings = await this.shippingRepository.findAndCount({
      take,
      skip,
      relations: { customer: true, products: true },
      order: { creationDate: 'DESC' }
    })

    return {
      count: shippings[1],
      shippings: shippings[0]
    }
  }

  async filter(search: string, take: number = 10, skip: number = 0) {
    if (EmailValidator.validate(search)) {
      const customer = await this.customerService.search({ email: search })
      if (!customer[0]) return false
      const id = customer[0].id
      const orders = await this.shippingRepository.findAndCount({
        take,
        skip,
        relations: { customer: true, products: true },
        where: { customer: { id } }
      })
      return {
        count: orders[1],
        shippings: orders[0]
      }
    }
    const shippings = this.shippingRepository.findAndCount({
      take,
      skip,
      where: { trackingCode: search }
    })
    return {
      count: shippings[1],
      shippings: shippings[0]
    }
  }

  async generateTrackingCode(): Promise<string> {
    const trackingCode = `TX${Math.floor(Math.random() * (99999999 - 10000000) + 10000000)}BR`
    return trackingCode
  }

  async track(trackingCode: string) {
    const history = await this.shippingHistoryService.listHistory(trackingCode)
    return history
  }

  async deleteHistory(id: string) {
    return await this.shippingHistoryService.delete(id)
  }

  async recover(customer: string) {
    return await this.shippingRepository.findAndCount({
      where: {
        customer: {
          email: customer
        }
      },
      relations: { products: true }
    })
  }
}
