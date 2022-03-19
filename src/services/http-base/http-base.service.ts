import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ConfigUrlService } from '../../interfaces/config.interface';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpBaseService {
  constructor(private http: HttpService) {}

  getHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  async createRequest<T = any>(
    uri: ConfigUrlService,
    headers: any,
    data: any = {},
    params: any = {},
  ): Promise<T> {
    const { url, method } = uri;
    const axiosConfig: AxiosRequestConfig = {
      url,
      method,
      data,
      headers,
      params,
      responseType: 'json',
      timeout: 40000,
    };

    return await firstValueFrom(
      this.http.request<T>(axiosConfig).pipe(
        map((axios) => this.processResponse<T>(axios)),
        catchError((err) => this.handleError(err)),
      ),
    );
  }

  processResponse<T>(axios: AxiosResponse<T>): T {
    return axios.data;
  }

  handleError(error: AxiosError | any): Observable<any> {
    return throwError(error);
  }
}
