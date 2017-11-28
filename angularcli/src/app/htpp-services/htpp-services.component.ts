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

  path = 'http://localhost/bestseller/server_PHP/Http_Request/Route_Http.php';


  ngOnInit() {
  }

  Http_get(){

  }

  Http_Post(){

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'text/plain');

    const obj = { status: 'products' , name: 'gabriel', age: 20 };
    const body = JSON.stringify(obj);

    return this.http.post(this.path,
        body,
        { headers:headers })
        .map((res: Response )=> res.json());


  }

}
