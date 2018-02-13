import { Inject, Injectable ,EventEmitter } from '@angular/core';

import { HttpService } from './http.service';

import {Observable} from 'rxjs/Observable';

import { Router, Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/map';

import 'rxjs/Rx'

@Injectable()

export class DataService {

  constructor( private httpservice : HttpService  ) {

  }


  public language:object={};

  public wishlist = [];

  public products = [];

  public pages:any;

  public response_database;

  public object = {};

  public categorys = [];

  public send_data_products = {'type': 'default', 'number_click': 0};


  public products_from_server(){

        this.httpservice.create_obj('products', this.send_data_products);

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


  category_from_server(){

        this.httpservice.create_obj( 'category','category' );

      return new Promise((resolve, reject) => {

          this.httpservice.Http_Post()

              .subscribe(
                  data => {

                      if (data['status'] == 'category') {

                          this.categorys = data['data']

                          resolve(true);
                      }
                  },

                  error => {reject(false)}
              );
      });
  }


  wishlist_from_server(){ // take wish list from  server ............

      this.httpservice.create_obj( 'get_wishList', 'wish' );

      return new Promise((resolve, reject) => {

          this.httpservice.Http_Post()

              .subscribe(
                  data => {

                      if (data['status'] == 'get_wishList') {

                          if (data['data'] != 'false') {

                              this.wishlist = data['data'];

                              resolve(true);
                          }

                      }

                  },

                  error => reject(false)
              );
      });
  }

  update_wishList( new_wish ){

      this.wishlist = new_wish;
  }

  update_language( new_language ){

      this.language = new_language;
  }


  language_from_server(){  // method that get language from server ......

      return new Promise( ( resolve, reject ) => {

          this.httpservice.create_obj('language', '1'); // create objet that send to backend with http

          const lang = this.httpservice.Http_Post(); // call method that make request .....

          lang.subscribe(data => {

                  this.language = data

                   resolve(true);

              }

              , error => (  reject(true) ) );
      });

  }




}

