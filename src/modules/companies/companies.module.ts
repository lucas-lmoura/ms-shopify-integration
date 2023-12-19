import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './entities/company.entity'
import { AddressesModule } from '../addresses/addresses.module'
import { CompaniesController } from './companies.controller'
import { CompanyTransformer } from './transformer/company.transformer'

@Module({
  imports: [TypeOrmModule.forFeature([Company]), AddressesModule],
  providers: [CompaniesService, CompanyTransformer],
  exports: [CompaniesService],
  controllers: [CompaniesController]
})
export class CompaniesModule {}
