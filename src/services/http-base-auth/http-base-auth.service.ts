import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ConfigUrlServiceAuth } from '../../interfaces/config.interface';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getNonce } from '../../helpers/utils';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class HttpBaseAuthService {
  constructor(private http: HttpService) {}

  getHeaders(endPoint: string, body) {
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_KEY_SECRET;
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

  getHeadersBitTrex(service: ConfigUrlServiceAuth, body ) {
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_KEY_SECRET;
    const { host, endpoint, method } = service;
    const uri = `${host}/${endpoint}`;
    const timestamp = new Date().getTime();
    const contentHash = CryptoJS.SHA512(JSON.stringify(body)).toString(
      CryptoJS.enc.Hex,
    );
    const subAccountId = '';
    const preSign = [timestamp, uri, method, contentHash, subAccountId].join(
      '',
    );
    const signature = CryptoJS.HmacSHA512(preSign, apiSecret).toString(
      CryptoJS.enc.Hex,
    );

    return {
      'Content-Type': 'application/json',
      'Api-Key': apiKey,
      'Api-Timestamp': timestamp,
      'Api-Content-Hash': contentHash,
      'Api-Signature': signature,
    };
  }


  async createRequest<T = any>(
    uri: ConfigUrlServiceAuth,
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
