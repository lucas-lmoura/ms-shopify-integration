import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { CustomersModule } from '../customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shippings } from '../shippings/entities/shipping.entity';
import { ShippingsModule } from '../shippings/shippings.module';
import { ProductsModule } from '../products/products.module';
import { DeliveryModule } from '../delivery/delivery.module';
import { ShopifyModule } from '../shopify/shopify.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shippings]),
    CustomersModule,
    ShippingsModule,
    ProductsModule,
    DeliveryModule,
    ShopifyModule
  ],
  providers: [WebhookService],
  controllers: [WebhookController]
})
export class WebhookModule {}
