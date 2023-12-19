import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly customRouteRepository: Repository<Delivery>,
  ) {

  }
  create(createDeliveryDto: CreateDeliveryDto) {
    const customRoute = new Delivery()
    customRoute.fillValues(createDeliveryDto)
    return this.customRouteRepository.save(customRoute)
  }

  async findAll(take: number, skip: number) {
    return await this.customRouteRepository.find({
      take,
      skip
    })
  }

  async findOne(id: string) {
    return await this.customRouteRepository.findOne({ where: { id }})
  }

  async fingByTag(tag: string) {
    return await this.customRouteRepository.findOne({ where: { tag } })
  }

  async remove(id: string) {
    return await this.customRouteRepository.softDelete({
      id
    })
  }
}
