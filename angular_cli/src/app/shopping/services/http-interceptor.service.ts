import { Injectable } from '@angular/core';

import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import{ AuthService } from './auth.service';

@Injectable({

  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor( private auth: AuthService ) {


  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem( this.auth.token_key );

    if( token ){

      const updatedRequest = request.clone({

        headers: request.headers.set("Authorization", token )

      });

      return next.handle(updatedRequest)

    }else{

      return next.handle(request)
    }

  }

}
