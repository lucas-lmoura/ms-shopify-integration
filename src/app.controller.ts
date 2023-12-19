import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common'
import { ShippingsService } from './modules/shippings/shippings.service'
import { ShippingHistoryTransformer } from './modules/shipping-history/transformer/shippingHistoryTransformer'
import { Public } from './decorators/publicRoutes'
import { ProductsService } from './modules/products/products.service'

@Controller()
export class AppController {
  constructor(
    private service: ProductsService
  ) {}

  @Public()
  @Get('/ping')
  ping() {
    return { ping: 'pong' }
  }

  @Public()
  @Get('/track/:trackId')
  async trackOrder(@Req() request, @Res() response, @Param('trackId') trackId: string) {
    try {
      const item = await this.service.track(trackId)
      return response.send(item)
    } catch (error) {
      console.log(error)
      return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid Tracking code' })
    }
  }
}
