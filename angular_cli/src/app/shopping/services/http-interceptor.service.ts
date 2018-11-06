
import { Injectable } from '@angular/core';

import {  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest ,HttpUserEvent ,HttpSentEvent ,HttpResponse ,HttpHeaderResponse ,HttpProgressEvent } from '@angular/common/http';

import { Observable, throwError ,BehaviorSubject} from 'rxjs';

import { catchError, mergeMap , switchMap ,finalize ,take ,filter } from 'rxjs/operators';

import{ AuthService } from './auth.service';

declare var clientSignature:any;

@Injectable({

  providedIn: 'root'

})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private auth : AuthService ) { }

    isRefreshingToken: boolean = false;

    tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

      if( this.auth.token ) {

          if( this.isRefreshingToken ){ //  next handle when make request to refresh token .........

              return next.handle(this.setRequestHeaders( request ));

          }else{ // request and catch Error when token is expired or any else Error ...........

              return next.handle(this.setRequestHeaders( request ))
                  .pipe(
                      catchError(err => { // catch response error from server
                          if (err instanceof HttpErrorResponse) {
                              switch ((<HttpErrorResponse>err).status) {
                                  case 401: // if is 401 error
                                      return this.handle401Error(request, next);  // return handle401Error method
                              }
                          } else {
                              return throwError(err);
                          }
                      })
                  );

          }

      }else{
          return next.handle(this.setRequestHeaders( request ))
      }
  }

  private setRequestHeaders(request: HttpRequest<any> ) : HttpRequest<any> { // set request headers ......

    if( this.isRefreshingToken ){

      return request.clone({headers :request.headers.set('X-Refresh-Token',this.auth.refresh_token || '').set('X-Signature',clientSignature || '') });

    } else if ( this.auth.login_request ){

      return request.clone( {headers :request.headers.set('X-Signature',clientSignature || '') } );

    }
    else if( this.auth.token ){

      return request.clone({headers :request.headers.set('X-Token', this.auth.token || '' ).set('X-Signature',clientSignature || '') });

    }else{
      return request;
    }
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) { // 401 error from server when token is expired ..

      if (!this.isRefreshingToken) {

          this.isRefreshingToken = true;
          // Reset here so that the following requests wait until the token
          // comes back from the refreshToken call.

          this.tokenSubject.next(null);

          return this.auth.refreshToken(clientSignature)  // make request to refresh token return false or new token and new refresh token

              .pipe(  // get result from refresh token ............................

                  switchMap((result: any) => {

                      if ( result ) {

                          this.isRefreshingToken = false;

                          this.auth.set_storage(this.auth.refresh_token_key ,result['new_refresh_token']);

                          this.auth.set_storage( this.auth.token_key , result['new_token']);

                          this.auth.token = result['new_token'];

                          this.auth.refresh_token = result['new_refresh_token'];

                          this.tokenSubject.next( result );

                          return next.handle(this.setRequestHeaders( request ) );
                      }

                      this.isRefreshingToken = false;

                      this.auth.logout();

                      this.tokenSubject.next(false);

                      return next.handle(request);
                  }),
                  catchError( err => {

                      this.isRefreshingToken = false;

                      this.auth.logout();

                      this.tokenSubject.next(false);

                      return next.handle(request);

                  } ),

                  finalize(() => {
                      this.isRefreshingToken = false;
                  }),
              );

      } else {
          return this.tokenSubject
              .pipe(filter(token => token != null),
                  take(1),
                  switchMap( token => {

                      if( token ){

                          return next.handle(this.setRequestHeaders( request ));


                      }else{
                          return next.handle(request);
                      }

                      }
                  )
            );


      }
  }
}

