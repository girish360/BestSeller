import { Injectable } from '@angular/core';

import {  Http, Response , Headers ,URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import {Observable} from "rxjs/Observable";

import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable()

export class HttpService extends EncryptDecryptService {

  constructor( protected http : Http  ) {

    super(); // initial parent ......................

  }

  private path = '/BestSellerApi';

  Http_Get( uri  , data ): Observable<any[]>{ // get method  wating for two parameters key string and data object....

    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    headers.append('Accept', 'text/plain');

    let params = new URLSearchParams();



    if( data != false ){

     let body =  this.encryp_AES( JSON.stringify( data ) );

     let keyparams ='params';

      params.append( keyparams , encodeURIComponent( body ) );

      return this.http.get( this.path+'/'+uri , { search:params ,headers:headers } )

          .map( ( Response ) => Response.json() );

    }else{

      return this.http.get( this.path+'/'+uri, { headers:headers } )

          .map( ( Response ) => Response.json() );
    }


  }


  Http_Post( uri , data ): Observable<any[]>{  // method that make popst request in server  and return response...........

    const headers = new Headers();

    headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );

    headers.append('Accept', 'text/plain');

    const body =  this.encryp_AES( JSON.stringify( data ) ); //  call method encrypt data

    return this.http.post( this.path+'/'+uri, body, { headers:headers } ) // send request

        .map( ( Response ) => Response.json() ); // get response

  }


}
