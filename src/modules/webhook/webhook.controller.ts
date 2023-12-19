import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Public } from 'src/decorators/publicRoutes';

@Controller('webhook')
export class WebhookController {

  constructor(
    private readonly service: WebhookService
  ){}

  @Public()
  @Post()
  async receiveHook(
    @Req() request,
    @Res() response,
    @Body() body: any
  ) {
    await this.service.processHook(body)
    return response.status(HttpStatus.OK).send()
  }
}
