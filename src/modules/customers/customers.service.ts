import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Customer } from './entities/customer.entity'
import { Repository } from 'typeorm'
import { CustomerDTO } from './dto/customer.dto'
import { CompaniesService } from '../companies/companies.service'

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly companyService: CompaniesService
  ) {}

  async create(createCustomerDTO: CustomerDTO): Promise<Customer> {
    const customer = new Customer()
    customer.fillValues(createCustomerDTO)
    if (createCustomerDTO.company) {
      const company = await this.companyService.findOne(createCustomerDTO.company)
      customer.company = company
    }
    return await this.customerRepository.save(customer)
  }

  async update(updateCustomerDTO: CustomerDTO) {
    const customer = await this.customerRepository.findOne({ where: { id: updateCustomerDTO.id } })
    customer.fillValues(updateCustomerDTO)
    return await this.customerRepository.save(customer)
  }

  async list(
    companyId: string,
    skip: number,
    take: number
  ): Promise<{ count: number; customers: Customer[] }> {
    const customers = await this.customerRepository.findAndCount({
      take,
      skip,
      relations: { company: true },
      where: { company: { id: companyId } }
    })
    return {
      count: customers[1],
      customers: customers[0]
    }
  }

  async findOne(id: string): Promise<Customer> {
    return await this.customerRepository.findOne({ where: { id } })
  }

  async search(query: { email?: string, name?: any }) {
    return await this.customerRepository.find({ where: query })
  }
}
