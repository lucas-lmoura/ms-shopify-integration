import { Transformer } from 'src/common/transformer'
import { Customer } from '../entities/customer.entity'

export class CustomerTransformer extends Transformer {
  constructor() {
    super()
  }

  public async collection(customers: Customer[]): Promise<Customer[]> {
    const transformedCustomers = []
    for (const customer of customers) {
      transformedCustomers.push(await this.transform(customer))
    }
    return transformedCustomers
  }

  public async transform(customer: Customer) {
    return {
      id: customer.id,
      document: customer.document,
      full_name: `${customer.first_name} ${customer.last_name}`,
      email: customer.email,
      phone: customer.phone,
      createdDate: customer.createdDate,
      shopifyId: customer.shopifyId
    }
  }
}
