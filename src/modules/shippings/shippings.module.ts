import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Shippings } from './entities/shipping.entity'
import { ShippingsService } from './shippings.service'
import { CustomersModule } from '../customers/customers.module'
import { ShippingHistoryModule } from '../shipping-history/shipping-history.module'
import { ShippingsController } from './shippings.controller'
import { ShippingTransformer } from './transformer/shippings.transformer'
import { HttpClient } from 'src/common/http.client'
import { ProductsTransformer } from '../products/transformer/products.transformer'

@Module({
  imports: [TypeOrmModule.forFeature([Shippings]), CustomersModule, ShippingHistoryModule],
  providers: [ShippingsService, ShippingTransformer, HttpClient, ProductsTransformer],
  controllers: [ShippingsController],
  exports: [ShippingsService]
})
export class ShippingsModule {}
