export interface HttpGetClient {
  get: <T = any>(params: HttpGetClient.Params) => Promise<T>
}

export namespace HttpGetClient {
  export type Params = {
    url: string
    config: any
    error?: boolean
  }
}

export interface HttpPostClient {
  post: <T = any>(params: HttpPostClient.Params) => Promise<T>
}

export namespace HttpPostClient {
  export type Params = {
    url: string
    body: any
    params?: object
    error?: boolean
  }
}
