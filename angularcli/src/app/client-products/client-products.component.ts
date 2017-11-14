import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders , HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
@Component({
  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.css']
})
export class ClientProductsComponent implements OnInit {

  request :string;
  constructor( private http : HttpClient) { }


  ngOnInit() {





      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

      const obj = { name: 'gabriel', age: 20 };
      const body = 'data=' + JSON.stringify(obj);

      this.http.post('http://localhost/bestseller/server_PHP/userprofile/classlangugage.php',
          body,
          { headers })
          .subscribe( HttpResponse => console.log(HttpResponse)
          ,(error)=>(console.log(error.status))
          );


  }

}
