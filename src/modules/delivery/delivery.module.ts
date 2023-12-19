import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { DeliveryTransformer } from './transformer/delivery.transformer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Delivery
    ])
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliveryTransformer],
  exports: [ DeliveryService ]
})
export class DeliveryModule {}
