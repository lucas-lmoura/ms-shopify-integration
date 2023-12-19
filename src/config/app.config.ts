const { env } = process

export interface IAppConfig {
  name: string
  port: number
  node_env: string
  secret: string,
  shopify_secret: string,
  shopify_url: string,
  maps_key: string
}

export default (): IAppConfig => {
  return {
    name: env.APP_NAME,
    port: +env.APP_PORT,
    secret: env.APP_SECRET,
    node_env: env.NODE_ENV,
    shopify_secret: env.SHOPIFY_SECRET,
    shopify_url: env.SHOPIFY_URL,
    maps_key: env.MAPS_API_KEY
  }
}
