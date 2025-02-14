export interface IApiResponse<T> {
  data: T;
  meta?: IMeta;
}

export interface IMeta {
  total_count: number;
  limit: number;
  offset: number;
  total_pages: number;
}

export interface IAxiosErrorResponseData {
  detail: string;
}
