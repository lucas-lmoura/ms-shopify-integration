import { Body, Controller, Param, ParseUUIDPipe, Put, Req, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDTO } from './dto/update.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly service: ProductsService
  ) {}

  @Put('/:id')
  async updateData(
    @Req() request,
    @Res() response,
    @Body() data: UpdateProductDTO,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ) {
    const result = await this.service.update(id, data)
    return response.send(result)
  }

}
