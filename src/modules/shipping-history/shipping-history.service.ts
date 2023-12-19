import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ShippingHistory } from './entities/shippingHistory.entity'
import { LessThanOrEqual, Repository } from 'typeorm'
import { ShippingHistoryDTO } from './dto/shippingHistory.dto'
import { Shippings } from '../shippings/entities/shipping.entity'
import moment from 'moment'

@Injectable()
export class ShippingHistoryService {
  constructor(
    @InjectRepository(ShippingHistory)
    private readonly shippingHistoryRepository: Repository<ShippingHistory>
  ) {}

  async create(customerShippingHistory: ShippingHistoryDTO[], shippingParent: Shippings) {
    const historic = []
    for (const history of customerShippingHistory) {
      const shippingHistory = new ShippingHistory()
      let saved
      if(!history.id) {
        shippingHistory.fillValues(history)
        shippingHistory.date = new Date(history.date)
        shippingHistory.shipping = shippingParent
        saved = await this.shippingHistoryRepository.save(shippingHistory)
      }
      saved = history

      historic.push(saved)
    }

    return historic
  }

  async listHistory(trackingCode: string) {
    return await this.shippingHistoryRepository.find({
      where: {
        date: LessThanOrEqual(moment().toDate()),
        shipping: {
          trackingCode
        }
      },
      relations: {
        shipping: true
      }
    })
  }

  async delete(id: string) {
    const item = await this.shippingHistoryRepository.findOne({where: { id }})
    await item.remove()
  }

  async todayPendingSends() {
    return await this.shippingHistoryRepository.find({
      where: {
        notified: false,
        date: moment(moment().format('YYYY-MM-DD 00:00:00')).toDate()
      },
      relations: {
        shipping: true
      }
    })
  }
}
