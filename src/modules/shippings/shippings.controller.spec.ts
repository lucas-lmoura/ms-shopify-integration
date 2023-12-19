import { Test, TestingModule } from '@nestjs/testing'
import { ShippingsController } from './shippings.controller'

describe('ShippingsController', () => {
  let controller: ShippingsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingsController]
    }).compile()

    controller = module.get<ShippingsController>(ShippingsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
