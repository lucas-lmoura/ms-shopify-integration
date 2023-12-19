import { Module } from '@nestjs/common'
import { ShippingHistoryService } from './shipping-history.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShippingHistory } from './entities/shippingHistory.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ShippingHistory])],
  providers: [ShippingHistoryService],
  exports: [ShippingHistoryService]
})
export class ShippingHistoryModule {}
