import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { MapsProvider } from 'src/providers/mapsProvider';
import { ProductsController } from './products.controller';
import { DeliveryModule } from '../delivery/delivery.module';
import { HttpClient } from 'src/common/http.client';
import { ShopifyModule } from '../shopify/shopify.module';
import { CustomersModule } from '../customers/customers.module';
import { ShippingsModule } from '../shippings/shippings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    ProductsModule,
    DeliveryModule,
    ShopifyModule,
    CustomersModule,
    ShippingsModule
  ],
  providers: [ProductsService, MapsProvider, HttpClient],
  exports: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
