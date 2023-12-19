import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  Body,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  ParseUUIDPipe,
  Put
} from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/company.dto'
import { CompanyTransformer } from './transformer/company.transformer'

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companyService: CompaniesService,
    private readonly companyTransformer: CompanyTransformer
  ) {}

  @Post()
  async createCompany(@Req() request, @Res() response, @Body() createcompanyDto: CreateCompanyDto) {
    try {
      const company = await this.companyService.create(createcompanyDto)
      return response
        .status(HttpStatus.CREATED)
        .send(await this.companyTransformer.transform(company))
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }
  }

  @Get()
  async listCompanies(
    @Req() request,
    @Res() response,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) skip: 0
  ) {
    const companies = await this.companyService.list(limit, skip)
    if (!companies) return response.status(HttpStatus.NO_CONTENT).send()
    return response.status(HttpStatus.OK).json({
      count: companies.count,
      companies: await this.companyTransformer.collection(companies.companies)
    })
  }

  @Get('/:id')
  async FindOneCompany(
    @Req() request,
    @Res() response,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ) {
    const company = await this.companyService.findOne(id)
    if (!company) return response.status(HttpStatus.NO_CONTENT).send()
    return response.status(HttpStatus.OK).json(await this.companyTransformer.transform(company))
  }

  @Put('/:id')
  async updateCompany(
    @Req() request,
    @Res() response,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() createcompanyDto: CreateCompanyDto
  ) {
    try {
      const update = await this.companyService.update(id, createcompanyDto)
      if (update) return response.status(HttpStatus.ACCEPTED).send()
      return response.status(HttpStatus.NOT_FOUND).send()
    } catch (error) {
      return request.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }
  }
}
