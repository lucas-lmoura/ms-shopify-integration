import { Module } from '@nestjs/common'
import { AddressesService } from './addresses.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Address } from './entities/addresses.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  exports: [AddressesService],
  providers: [AddressesService]
})
export class AddressesModule {}
