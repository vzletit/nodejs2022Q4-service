import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ConvertDateTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (data && data.hasOwnProperty('createdAt')) {
          data.createdAt = Date.parse(data.createdAt.toISOString());
        }

        if (data && data.hasOwnProperty('updatedAt')) {
          data.updatedAt = Date.parse(data.updatedAt.toISOString());
        }

        return data;
      }),
    );
  }
}
