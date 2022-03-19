import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GlobalResponse } from '../interfaces/response-common.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, GlobalResponse<T>> {
  createResponse(data: T): GlobalResponse<T> {
    return {
      status: {
        code: HttpStatus.OK,
        message: 'ok',
      },
      data,
    };
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(this.createResponse));
  }
}