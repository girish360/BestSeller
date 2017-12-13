import { Injectable ,EventEmitter } from '@angular/core';

import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot  } from '@angular/router';

import { HtppServicesComponent } from '../htpp-services/htpp-services.component';

import {Observable} from 'rxjs/Observable';

interface  language {

}

@Injectable()

export class DataServiceService {

  constructor(  private http: HtppServicesComponent , private router: Router  ) {

    this.get_language(); // call method that get language from server ...

    this.get_WishListFromServer(); // call method to get wishList from server ......

    this.get_productsFromServer(); // call method to get products from server ........

  }

  wishList_products:EventEmitter<any> = new EventEmitter;

  Language:EventEmitter<object> = new EventEmitter;

  Products:EventEmitter<any> = new EventEmitter;

  public language:object={};

  public wishlist = [];

  public products = [];

  get_WishListFromServer(){ // take wish list from  server ............

    this.http.create_obj( 'get_wishList', 'wish' );

    this.http.Http_Post()
        .subscribe(
            data => {
              if( data['status'] == 'get_wishList' ){

                if(data['data'] !='false') {

                  this.wishList_products.emit(data['data']);
                  this.wishlist = data['data'];

                }
              }
            },
            error => console.log( error +'gabim' )

        );

  }

  update_wishList(new_wish){

      this.wishlist=new_wish;
  }




  get_language(){  // method that get language from server ......

    this.http.create_obj('language','English'); // create objet that send to backend with http

    const lang  = this.http.Http_Post(); // call method that make request .....

    lang.subscribe( data => {  this.Language.emit(data) , this.language = data });

  }

  get_productsFromServer(){

    this.http.create_obj( 'products','products' );


    this.http.Http_Post()
        .subscribe(
            data => {
              if( data['status'] == 'products' ){
                this.Products.emit(  data['data'] );

                this.products =  data['data'];
              }
            },
            error => console.log( error +'gabim' )

        );
  }







}
