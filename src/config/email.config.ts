const { env } = process

export interface IEmailConfig {
  mailFrom: string
  host: string
  port: number
  service: string
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export default (): IEmailConfig => {
  return {
    mailFrom: env.MAIL_FROM,
    host: env.EMAIL_HOST,
    port: +env.EMAIL_PORT,
    service: env.EMAIL_SERVICE,
    secure: true,
    auth: {
      user: env.EMAIL_USER || 'naoresponder@entregas-brasil.com',
      pass: env.EMAIL_PASSWORD
    }
  }
}
