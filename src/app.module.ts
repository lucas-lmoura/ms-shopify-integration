import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './modules/users/users.module'
import { CompaniesModule } from './modules/companies/companies.module'
import { AddressesModule } from './modules/addresses/addresses.module'
import { CustomersModule } from './modules/customers/customers.module'
import { ShippingsModule } from './modules/shippings/shippings.module'
import { ShippingHistoryModule } from './modules/shipping-history/shipping-history.module'
import databaseConfig from './config/database.config'
import { ShippingHistoryTransformer } from './modules/shipping-history/transformer/shippingHistoryTransformer'
import { EnsureUserAuthGuard } from './guards/ensure-user-auth.guard'
import { WebhookModule } from './modules/webhook/webhook.module'
import { DeliveryModule } from './modules/delivery/delivery.module'
import { ProductsModule } from './modules/products/products.module'
import { ShopifyModule } from './modules/shopify/shopify.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig as any]
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    UsersModule,
    CompaniesModule,
    AddressesModule,
    CustomersModule,
    ShippingsModule,
    ShippingHistoryModule,
    WebhookModule,
    DeliveryModule,
    ProductsModule,
    ShopifyModule
  ],
  controllers: [AppController],
  providers: [
    ShippingHistoryTransformer,
    {
      provide: 'APP_GUARD',
      useClass: EnsureUserAuthGuard
    }
  ]
})
export class AppModule {}
