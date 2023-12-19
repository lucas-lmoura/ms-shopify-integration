import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class ShopifyService {
  private readonly url = process.env.SHOPIFY_URL
  constructor() {}

  async notifyShopify(orderID: string, trackingCode: string) {
    await axios
      .get(`${process.env.SHOPIFY_URL}/orders/${orderID}/fulfillments.json`, {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_SECRET,
          'Content-Type': 'application/json'
        }
      })
      .then(async (res) => {
        const fullfilmentID = res.data.fulfillments[0].id
        await axios.post(
          `${process.env.SHOPIFY_URL}/fulfillments/${fullfilmentID}/update_tracking.json`,
          {
            fulfillment: {
              notify_customer: false,
              tracking_info: {
                company: 'other',
                number: trackingCode
              }
            }
          },
          {
            headers: {
              'X-Shopify-Access-Token': process.env.SHOPIFY_SECRET,
              'Content-Type': 'application/json'
            }
          }
        )
      })
  }
}
