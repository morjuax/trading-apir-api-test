export interface GlobalResponse<T> {
  status: Status;
  data: T;
}

export interface Status {
  code: number;
  message: string;
}