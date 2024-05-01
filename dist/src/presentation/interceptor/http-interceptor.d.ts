import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class HttpInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<FixType>): Observable<FixType> | Promise<Observable<FixType>>;
}
