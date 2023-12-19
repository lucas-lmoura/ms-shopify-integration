import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { DeliveryTransformer } from './transformer/delivery.transformer';
import { Public } from 'src/decorators/publicRoutes';

@Controller('delivery')
export class DeliveryController {
  constructor(
    private readonly deliveryService: DeliveryService,
    private readonly deliveryTransformer: DeliveryTransformer
  ) {}

  @Post()
  async create(
      @Body() createDeliveryDto: CreateDeliveryDto
    ) {
    return await this.deliveryTransformer.transform(await this.deliveryService.create(createDeliveryDto));
  }

  @Get()
  async findAll(
    @Query('limit') take: number = 6,
    @Query('limit') skip: number = 0
  ) {
    return await this.deliveryTransformer.collection(await this.deliveryService.findAll(take, skip));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deliveryService.remove(id);
  }
}
