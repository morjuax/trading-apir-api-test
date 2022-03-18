import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ConfigUrlService } from '../../interfaces/config.interface';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getNonce } from '../../helpers/utils';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class HttpBaseService {
  constructor(private http: HttpService) {}

  getHeaders(endPoint: string, body) {
    const apiKey = '1PX0Dt9HDOo6KmduqN8EPdrRTFsVLUIatRO55CBcWua';
    const apiSecret = 'ypZooOhORlo1WGfzxe5TO0d3hLosQWjaoZnpr8opbHq';
    const nonce = getNonce();
    const signature = `/api/${endPoint}${nonce}${JSON.stringify(body)}`;
    const sig = CryptoJS.HmacSHA384(signature, apiSecret).toString();

    return {
      'Content-Type': 'application/json',
      'bfx-nonce': nonce,
      'bfx-apikey': apiKey,
      'bfx-signature': sig,
    };
  }

  async createRequest<T = any>(
    uri: ConfigUrlService,
    data: any = {},
    params: any = {},
  ): Promise<T> {
    const { host, endpoint, method } = uri;
    const url = `${host}/${endpoint}`;
    const headers = this.getHeaders(endpoint, data);

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
