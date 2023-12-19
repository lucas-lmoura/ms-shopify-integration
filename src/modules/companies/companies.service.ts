import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Company } from './entities/company.entity'
import { Repository } from 'typeorm'
import { CreateCompanyDto } from './dto/company.dto'
import { AddressesService } from '../addresses/addresses.service'
import { randomUUID } from 'crypto'

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly addressService: AddressesService
  ) {}

  async list(
    take: number = 10,
    skip: number = 0
  ): Promise<{ companies: Company[]; count: number }> {
    const result = await this.companyRepository.findAndCount({
      skip,
      take,
      relations: {
        address: true
      }
    })
    return {
      companies: result[0],
      count: result[1]
    }
  }

  async findOne(id: string): Promise<Company> {
    return await this.companyRepository.findOne({ where: { id }, relations: { address: true } })
  }

  async create(companyDto: CreateCompanyDto): Promise<Company> {
    const company = new Company()
    company.id = randomUUID()
    company.isActive = true
    company.fillValues(companyDto)
    await this.companyRepository.save(company)
    const address = await this.addressService.create(companyDto.address)
    company.address = address
    return company
  }

  async delete(): Promise<void> {
    return
  }

  async update(companyId: string, updateCompany: CreateCompanyDto): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id: companyId } })
    company.fillValues(updateCompany)
    if (updateCompany.address) {
      await this.addressService.update(updateCompany.address, updateCompany.address.id)
    }
    await this.companyRepository.save(company)
    return company
  }
}
