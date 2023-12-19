import { Test, TestingModule } from '@nestjs/testing'
import { ShippingHistoryService } from './shipping-history.service'

describe('ShippingHistoryService', () => {
  let service: ShippingHistoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingHistoryService]
    }).compile()

    service = module.get<ShippingHistoryService>(ShippingHistoryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
