import axios from 'axios'
import { HttpGetClient, HttpPostClient } from './contracts'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AxiosHttpClient implements HttpGetClient {
  async get({ url, config }: HttpGetClient.Params): Promise<any> {
    const { data } = await axios.get(url, config)
    return data
  }

  async post<T = any>({
    url,
    body,
    params,
  }: HttpPostClient.Params): Promise<T> {
    const { data } = await axios.post(url, body, params)
    return data
  }
}
