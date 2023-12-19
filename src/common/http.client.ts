import axios, { AxiosInstance } from 'axios'

export interface IAxiosInscanteParams {
  baseURL: string
  headers: Record<string, any>
}

export class HttpClient {
  private readonly instance: AxiosInstance

  constructor(params: IAxiosInscanteParams) {
    this.instance = axios.create(params)
  }

  private createQueryURL(query: object) {
    const keys = Object.keys(query)
    const values = Object.values(query)

    let q = '?'

    if (keys.length === 0) return ''

    keys.map((k, idx) => {
      q += `${k}=${values[idx]}&`
    })

    return q
  }

  public get({
    path,
    query = {},
    headers = {}
  }: {
    path: string
    query?: object
    headers?: object
  }) {
    return this.instance.get(`${path}${this.createQueryURL(query)}`, {
      headers
    })
  }

  public post({
    path,
    data = {},
    headers = {}
  }: {
    path: string
    data?: object
    headers?: object
  }) {
    return this.instance.post(path, data, { headers })
  }
}
