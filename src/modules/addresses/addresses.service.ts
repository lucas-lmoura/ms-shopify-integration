import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Address } from './entities/addresses.entity'
import { Repository } from 'typeorm'
import { CreateAddressDTO } from './dto/createAddress.dto'
import { randomUUID } from 'crypto'
import { Company } from '../companies/entities/company.entity'

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>
  ) {}

  async create(addressDTO: CreateAddressDTO): Promise<Address> {
    const address = new Address()
    address.id = randomUUID()
    address.fillValues(addressDTO)
    await this.addressRepository.save(address)
    return address
  }

  async update(addressDTO: CreateAddressDTO, id: string): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id } })
    address.fillValues(addressDTO)
    await this.addressRepository.save(address)
    return address
  }
}
