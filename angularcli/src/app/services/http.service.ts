import { Injectable } from '@angular/core';
import {  Http, Response , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class HttpService {

  constructor( private http : Http ) { }

  path = '/api/bestseller/server_PHP/Http_Request/Route_Http.php';

  private object = {};

  Http_Get(){

  }

  Http_Post(){

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'text/plain');

    const body = JSON.stringify(this.object);

    return this.http.post(this.path, body, { headers:headers })
        .map( ( Response ) => Response.json() );

  }

  create_obj( status , value ) {

    this.object = { status: status , value: value };

  }

}
