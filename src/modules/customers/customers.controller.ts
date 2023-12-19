import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res
} from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CustomerTransformer } from './transformer/customer.transformer'
import { CustomerDTO } from './dto/customer.dto'

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customerService: CustomersService,
    private readonly customerTransformer: CustomerTransformer
  ) {}

  @Post()
  async createCustomer(@Req() request, @Res() response, @Body() createCustomerDTO: CustomerDTO) {
    try {
      const customer = await this.customerService.create(createCustomerDTO)
      return response
        .status(HttpStatus.CREATED)
        .json(await this.customerTransformer.transform(customer))
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }
  }

  @Put()
  async udpateCustomer(@Req() request, @Res() response, @Body() createCustomerDTO: CustomerDTO) {
    try {
      const customer = await this.customerService.update(createCustomerDTO)
      return response
        .status(HttpStatus.ACCEPTED)
        .json(await this.customerTransformer.transform(customer))
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }
  }

  @Get('/:customerId')
  async findOne(
    @Req() request,
    @Res() response,
    @Param('customerId', new ParseUUIDPipe({ version: '4' })) customerId: string
  ) {
    try {
      const customer = await this.customerService.findOne(customerId)
      if (!customer) return response.status(HttpStatus.NO_CONTENT).send()
      return response.status(HttpStatus.OK).json(await this.customerTransformer.transform(customer))
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }
  }

  @Get('/list/:companyId')
  async findAllCustomers(
    @Req() request,
    @Res() response,
    @Param('companyId', new ParseUUIDPipe({ version: '4' })) companyId: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) skip: 0
  ) {
    try {
      const customers = await this.customerService.list(companyId, skip, limit)
      if (!customers) return response.status(HttpStatus.NO_CONTENT).send()
      return response.status(HttpStatus.OK).json({
        count: customers.count,
        customers: await this.customerTransformer.collection(customers.customers)
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }
  }
}
