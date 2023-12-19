import { Module } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from './entities/customer.entity'
import { CompaniesModule } from '../companies/companies.module'
import { CustomersController } from './customers.controller'
import { CustomerTransformer } from './transformer/customer.transformer'

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), CompaniesModule],
  providers: [CustomersService, CustomerTransformer],
  controllers: [CustomersController],
  exports: [CustomersService]
})
export class CustomersModule {}
