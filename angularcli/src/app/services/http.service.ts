import { Injectable } from '@angular/core';
import {  Http, Response , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";

@Injectable()

export class HttpService {

  constructor( protected http : Http ) {

  }

  private path = '/api/bestseller/server_PHP/Http_Request/Route_Http.php';

  Http_Get(){

  }

  Http_Post( data ): Observable<any>{  // method that make popst request in server  and return response...........

    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    headers.append('Accept', 'text/plain');

    const body = JSON.stringify( data );

    return this.http.post(this.path, body, { headers:headers })

        .map( ( Response ) => Response.json() );

  }

}
