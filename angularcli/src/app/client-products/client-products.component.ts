import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HtppServicesComponent } from '../htpp-services/htpp-services.component';


declare  var $:any;
@Injectable()
@Component({
  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.css'],
    providers:[HtppServicesComponent]
})
export class ClientProductsComponent implements OnInit {

   public  products =[];


  constructor( private httpservice :HtppServicesComponent ) { }

  ngOnInit() {

  this.httpservice.Http_Post()
     .subscribe(
         data => {
             if( data['status'] == 'products' ){
                 this.products = data['data'];
                 console.log(data['data']);
             }
         },
         error => console.log( error +'gabim' )

     );





  }




}
