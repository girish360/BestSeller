import { Inject, Injectable ,EventEmitter } from '@angular/core';

import { HttpService } from './http.service';

import {Observable} from 'rxjs/Observable';

import { Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/map';

import 'rxjs/Rx'

@Injectable()

export class DataService {

  constructor( private httpservice : HttpService  ) {

      this.get_WishListFromServer();

      this.get_language();

      this.get_category();

  }


  public language:object={};

  public wishlist = [];

  public products = [];

  public pages:any;

  public response_database;

  public object = {};

  public categorys = [];


    public load(){

        this.object = {'type': 'default', 'number_click': 0};

        this.httpservice.create_obj('products', this.object);

        return new Promise((resolve, reject) => {
            this.httpservice.Http_Post()

                .subscribe(
                    data => {

                        if (data['status'] == 'products') {

                            this.products = data['data'];

                            resolve(true);
                        }

                    },

                    error => (error : any) =>  { reject(false); }
                );
        });

    }

    get_category(){

        this.httpservice.create_obj( 'category','category' );

        this.httpservice.Http_Post()
            .subscribe(
                data => {
                    if( data['status'] == 'category' ){
                        this.categorys = data['data']
                    }
                },
                error => console.log( error +'gabim' )

            );
     }


  get_WishListFromServer(){ // take wish list from  server ............

    this.httpservice.create_obj( 'get_wishList', 'wish' );

    this.httpservice.Http_Post()
        .subscribe(
            data => {
              if( data['status'] == 'get_wishList' ){

                if( data['data'] !='false' ) {

                    this.wishlist = data['data'];
                }
              }
            },
            error => console.log( error +'gabim' )

        );

  }

  update_wishList( new_wish ){

     this.wishlist = new_wish;
  }

  update_language( new_language ){

        this.language = new_language;
  }


  get_language(){  // method that get language from server ......

    this.httpservice.create_obj('language','1'); // create objet that send to backend with http

    const lang  = this.httpservice.Http_Post(); // call method that make request .....

    lang.subscribe( data => {

            this.language = data
        }

        ,error =>( console.log( error.status ) ) );

  }

  get_productsFromServer(){

    this.object = {'type':'default','number_click':0};

    this.httpservice.create_obj( 'products', this.object);

      const products_details_from_server = this.httpservice.Http_Post();

      products_details_from_server.subscribe(

            data => {

              if( data['status'] == 'products' ){

                  this.products =  data['data'];
              }

            },

            error => console.log( error +'gabim' )
        );

  }




}

