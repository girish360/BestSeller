import { Inject, Injectable ,EventEmitter } from '@angular/core';

import { HttpService } from './http.service';

import {Observable} from 'rxjs/Observable';

import { AuthService } from './auth.service';

import {  Http, Response , Headers} from '@angular/http';

import 'rxjs/add/operator/map';

import 'rxjs/Rx'

@Injectable()

export class DataService  extends AuthService {

  constructor( private httpservice : HttpService , protected http:Http  ) {

     super( http );

  }

  public language:object={};

  public wishlist = [];

  public products = [];

  public Response:any;

  public pages:any;

  public response_database;

  public object_request = {};

  public categorys = [];

  public status_menu = false;

  public  create_object_request( status , value ) {

      this.object_request = { status: status , value: value };

  }

  public Make_Request_InServer(  status , value ){ // method that get response from http method  with promise ( resolve  and reject )

    this.object_request = { status: status , value: value };

    return new Promise( ( resolve , reject ) => {

        this.httpservice.Http_Post( this.object_request )

            .subscribe(

                data => {

                    this.check_response( data );

                    resolve( data['data'] );

                },

                error => (error : any) =>  { reject( false ); }

            );
    });

  }

    check_response( data ){

      if ( data['status'] == 'products' ) {

          this.products = data['data'];
      }

      else if (data['status'] == 'category') {

          this.categorys = data['data']
      }

      else if (data['status'] == 'get_wishList') {

          if (data['data'] != 'false') {

              this.wishlist = data['data'];

          }
      }

      else if( data['status']=='language' ) {

          this.language = data['data'];


      }
  }

  update_wishList( new_wish ){

      this.wishlist = new_wish;
  }

  update_language( new_language ){

      this.language = new_language;
  }

}

