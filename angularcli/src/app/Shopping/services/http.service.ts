import { Injectable } from '@angular/core';
import {  Http, Response , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";

@Injectable()

export class HttpService {

  constructor( protected http : Http ) {

  }

  private path = '/api/Http_Request/Route_Http.php';



  Http_Get( data ): Observable<any>{

    const headers = new Headers();

    let path_get = this.path + data ;

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    headers.append('Accept', 'text/plain');

    return this.http.get( path_get, { headers:headers })

        .map( ( Response ) => Response.json() );


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
