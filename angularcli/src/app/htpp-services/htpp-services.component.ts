import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {  Http, Response , Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
@Component({
  selector: 'app-htpp-services',
  templateUrl: './htpp-services.component.html',
  styleUrls: ['./htpp-services.component.css']
})
export class HtppServicesComponent implements OnInit {

  constructor( private http : Http ) { }

  path = '/api/bestseller/server_PHP/Http_Request/Route_Http.php';

  private object = {};

  ngOnInit() {
  }

  Http_get(){

  }

  Http_Post(){

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'text/plain');


    const body = JSON.stringify(this.object);

    return this.http.post(this.path,
        body,
        { headers:headers })
        .map((Response )=> Response.json());


  }

  create_obj( status , value ) {

    this.object = { status: status , value: value };

    return this.object;

  }

}
