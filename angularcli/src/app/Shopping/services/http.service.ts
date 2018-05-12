import { Injectable } from '@angular/core';

import {  Http, Response , Headers} from '@angular/http';

import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import {Observable} from "rxjs/Observable";

import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable()

export class HttpService extends EncryptDecryptService {

  constructor( protected http : Http  ) {

    super(); // initial parent ......................

  }

  private path = '/api/Http_Request/Route_Http.php';

  Http_Get( data ): Observable<any[]>{

    const headers = new Headers();

    let path_get = this.path + data;

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    headers.append('Accept', 'text/plain');

    return this.http.get( path_get, { headers:headers })

        .map( ( Response ) => Response.json() );


  }


  Http_Post( data ): Observable<any[]>{  // method that make popst request in server  and return response...........

    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    headers.append('Accept', 'text/plain');

    const body = this.encrypt_object( JSON.stringify( data ) ); //  call method encrypt data

    return this.http.post( this.path, body, { headers:headers } ) // send request

        .map( ( Response ) => Response.json() ); // get response

  }

  encrypt_object( object ){ // encrypt method

    return this.encryp_AES( object ); // call encryp_AES in ecrypt-decrypt service

  }

}
