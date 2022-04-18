import { HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { SharedDataService } from '../services/shared-data.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private sharedData: SharedDataService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseReq: HttpRequest<any> = req;
    this.sharedData.isLoadingData.next(true);
    return next.handle(baseReq).pipe(
        finalize(() => {
          setTimeout(() => {
            this.sharedData.isLoadingData.next(false)
          }, 250);
        }),
        catchError((error: HttpErrorResponse) => {
            return throwError(error);
        })
    );
  }
}