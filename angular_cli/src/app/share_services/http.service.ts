import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders ,HttpParams ,HttpErrorResponse ,HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';

import {Observable} from "rxjs/Observable";

import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable()

export class HttpService extends EncryptDecryptService{

    constructor( protected http : HttpClient ) {

      super(); // initial parent ......................



    }

    private baseUrl = '/BestSellerApi';

    Http_Get( uri  , data ): Observable<HttpResponse<any>>{ // get method  wating for two parameters key string and data object....

        if( data != false ){ // get http with params in url

            let keyparams ='params';

            const params = new HttpParams().set( keyparams , encodeURIComponent( JSON.stringify( data ) ) );

            return this.http.get<any>( this.baseUrl+'/'+uri ,

                {

                    headers: new HttpHeaders({

                        'Content-Type':  'application/json; charset=utf-8'

                    }),

                    params:params
                }
            )

        }else{ // without params

            return this.http.get<any>( this.baseUrl+'/'+uri,

                {

                    headers: new HttpHeaders({

                        'Content-Type':  'application/json; charset=utf-8'

                    }),

                }
            )

        }

    }


    Http_Post( uri , data ): Observable<HttpResponse<any>>{  // method that make popst request in server  and return response...........


      return this.http.post<any>( this.baseUrl+'/'+uri, JSON.stringify( data ), // url and body

          {  // http options
              headers: new HttpHeaders({

                  'Content-Type':  'application/json; charset=utf-8'

              }),

              observe: 'response'
          }
      ) // send request


  }


    private handleError(error: HttpErrorResponse) {
        if ( error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
        'Something bad happened; please try again later.');
    };


}
