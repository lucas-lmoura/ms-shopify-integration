import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  Get,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Param,
  ParseUUIDPipe,
  Put,
  Delete
} from '@nestjs/common'
import { ShippingsService } from './shippings.service'
import { ShippingsDTO } from './dto/shippings.dto'
import { ShippingTransformer } from './transformer/shippings.transformer'

@Controller('shippings')
export class ShippingsController {
  constructor(
    private readonly shippingService: ShippingsService,
    private readonly shippingTransformer: ShippingTransformer
  ) {}

  @Post()
  async create(@Req() request, @Res() response, @Body() shippingDTO: ShippingsDTO) {
    try {
      const shipping = await this.shippingService.create(shippingDTO)
      return response
        .status(HttpStatus.CREATED)
        .json(await this.shippingTransformer.transform(shipping))
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
    }
  }

  @Get()
  async list(
    @Req() request,
    @Res() response,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) skip: 0,
  ) {
    const shippings = await this.shippingService.list(limit, skip)
    if (!shippings) return response.status(HttpStatus.NO_CONTENT).send()
    return response.status(HttpStatus.OK).json({
      count: shippings.count,
      shippings: await this.shippingTransformer.collection(shippings.shippings)
    })
  }

  @Get('/search')
  async search(
    @Req() request,
    @Res() response,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) skip: 0,
    @Query('search') search: string
  ) {
    const result = await this.shippingService.filter(search, limit, skip)
    if(result) return response.status(HttpStatus.OK).json({
      count: result.count,
      shippings: await this.shippingTransformer.collection(result.shippings)
    })
    else return response.status(HttpStatus.NO_CONTENT).send()
  }
  
  @Delete('/:id')
  async deleteItem(
    @Req() request,
    @Res() response,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ) {
    await this.shippingService.deleteHistory(id)
    return response.status(HttpStatus.NO_CONTENT).send()
  }
}
