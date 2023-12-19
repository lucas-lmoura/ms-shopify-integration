import { Company } from '../entities/company.entity'
import { Transformer } from 'src/common/transformer'

export class CompanyTransformer extends Transformer {
  constructor() {
    super()
  }

  public async collection(companies: Company[]) {
    const transformedCompanies = []
    for (const company of companies) {
      transformedCompanies.push(await this.transform(company))
    }
    return transformedCompanies
  }

  public async transform(company: Company) {
    return {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      email: company.email,
      phone: company.phone,
      address: {
        street: company.address.street,
        number: company.address.number,
        complement: company.address.complement,
        city: company.address.city,
        state: company.address.state
      }
    }
  }
}
